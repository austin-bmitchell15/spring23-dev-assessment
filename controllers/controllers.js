import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import { UserModel } from "../models/userModel.js";
import { TrainingModel } from "../models/trainingModel.js";
import { AnimalModel } from "../models/animalModel.js";
import e from "express";


export const getHealth = async (req, res) => {
    res.status(200).json({ "health": true })
}

export const createUser = async (req, res) => {
    const {_id, firstName, lastName, email, password, profilePicture, } = req.body;
    try {
        if (!(mongoose.Types.ObjectId.isValid(_id)) || typeof firstName !== "string" || typeof lastName !== "string" || typeof email !== "string" || typeof password !== "string" || typeof profilePicture !== "string"){ 
            return res.status(400).json({message: 'The entered information is incorrect'});
        }

        const existingUser = await UserModel.findOne({ _id });
        const existingEmail = await UserModel.findOne({ email });

        if (existingUser || existingEmail) return res.status(400).json({message: 'This user already exists!'});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await UserModel.create({email: email, password: hashedPassword, firstName: firstName, lastName: lastName, profilePicture: profilePicture});

        res.status(200).json({result});
    }  catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export const createAnimal = async (req, res) => {
    const {_id, name, hoursTrained, dateOfBirth, profilePicture} = req.body;
    try {
        if (!(mongoose.Types.ObjectId.isValid(_id)) || typeof name !== "string" || typeof hoursTrained !== "number" || !(mongoose.Types.ObjectId.isValid(owner)) || (dateOfBirth instanceof Date && !isNaN(dateOfBirth.valueOf())) || typeof profilePicture !== "string"){ 
            return res.status(400).json({message: 'The entered information is incorrect'});
        }

        const existingAnimal = await AnimalModel.findOne({ _id });

        const owner = jwt.verify(req.headers['authorization'].split(" ")[1], process.env.TOKEN_KEY)._id;

        if (existingAnimal) return res.status(400).json({message: 'This animal already exists!'});

        const result = await AnimalModel.create({_id: _id, name: name, hoursTrained: hoursTrained, owner: owner, profilePicture: profilePicture});

        res.status(200).json({result});
    }  catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export const createTraining = async (req, res) => {
    const {_id, date, description, hours, animal, trainingLogVideo,} = req.body;
    try {
        if (!(mongoose.Types.ObjectId.isValid(_id)) || (date instanceof Date && !isNaN(date.valueOf())) || typeof description !== "string" || typeof hours !== "number"  || !(mongoose.Types.ObjectId.isValid(animal)) || !(mongoose.Types.ObjectId.isValid(user)) || typeof trainingLogVideo !== "string"){ 
            return res.status(400).json({message: 'The entered information is incorrect'});
        }

        const checkAnimal = await AnimalModel.findById(animal);

        const user = jwt.verify(req.headers['authorization'].split(" ")[1], process.env.TOKEN_KEY)._id;

        if (checkAnimal.owner !== user) {
            return res.status(400).json({message: 'The entered traiing does not own the entered animal'});
        }


        

        const existingTraining = await TrainingModel.findOne({ _id });

        if (existingTraining) return res.status(400).json({message: 'This training already exists!'});

        const result = await TrainingModel.create({_id: _id, date: date, date: date, description: description, hours: hours, animal: animal, user: user, trainingLogVideo: trainingLogVideo});

        res.status(200).json({result});
    }  catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export const getUsers = async (req, res) => {
    const { page_size, last_id } = req.body;

    try {
        let users;
        if (last_id) {
            users = UserModel.find().limit(page_size);
        }else {
            users = UserModel.find({'_id' : {'$gt': last_id}}).limit(page_size)
        }

        const newLast_id = users[users.length - 1]._id;

        if (users && newLast_id) {
            res.status(200).json({users, newLast_id})
        } else {
            res.status(500).json({ message: 'Something went wrong' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export const getAnimals = async (req, res) => {
    const { page_size, last_id } = req.body;

    try {
        let animals;
        if (last_id) {
            animals = AnimalModel.find().limit(page_size);
        }else {
            animals = AnimalModel.find({'_id' : {'$gt': last_id}}).limit(page_size)
        }

        const newLast_id = animals[animals.length - 1]._id;

        if (animals && newLast_id) {
            res.status(200).json({users: animals, newLast_id})
        } else {
            res.status(500).json({ message: 'Something went wrong' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export const getTrainings = async (req, res) => {
    const { page_size, last_id } = req.body;

    try {
        let trainings;
        if (last_id) {
            trainings = TrainingModel.find().limit(page_size);
        }else {
            trainings = AnimalModel.find({'_id' : {'$gt': last_id}}).limit(page_size)
        }

        const newLast_id = trainings[trainings.length - 1]._id;

        if (trainings && newLast_id) {
            res.status(200).json({users: trainings, newLast_id})
        } else {
            res.status(500).json({ message: 'Something went wrong' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export const loginUser = async (req, res) => {
    const { email, password} = req.body;
    const existingUser = await UserModel.findOne({ email });

    if(!existingUser) return res.status(403).json({message: 'Invalid Credentials'});

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if(!isPasswordCorrect) return res.status(403).json({message: 'Invalid Credentials'});

    res.status(200).json({result: existingUser});
}

export const verifyUser = async (req, res) => {
    const { email, password} = req.body;
    const existingUser = await UserModel.findOne({ email });

    if(!existingUser) return res.status(403).json({message: 'Invalid Credentials'});

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if(!isPasswordCorrect) return res.status(403).json({message: 'Invalid Credentials'});

    const token = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.JWT_STRING);

    res.status(200).json({result: existingUser, token});
}