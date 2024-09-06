import axios, { AxiosResponse } from "axios";
import { Response, Request, NextFunction } from "express";
import DB_Tables_Names from "../helpers/constant";
import { db } from "../server";
import { RowDataPacket } from "mysql2";
import nodemailer from "nodemailer";
import {sendWelcomeEmail}  from './email.controller';
import { userProfile } from "../models/userProfileModel";

export const checkEmployeeAccess = async (req: Request, res: Response) => {
  const { email, passowrd } = req.body;
  const query = `SELECT * FROM ${DB_Tables_Names.user_profile} WHERE Email=? and Password=?`;
  db.query<[]>(query, [email, passowrd], (err, result) => {
    if (err) {
      res.status(500).json("failed to login try again");
    }
    if (result) {
      const rows = result as RowDataPacket[];
      if (rows.length > 0) {
        res.status(200).json({ Access: true });
      } else {
        res.status(200).send("The email is not exist create an account");
      }
    }
  });
};

export const signUp = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const query = `INSERT INTO ${DB_Tables_Names.user_profile} (Name,Email,Password) Values(?,?,?)`;
  db.query<[]>(query, [name, email, password], (err, result) => {
    if (err) {
      res.status(500).json("failed to create an account"+err);
    }
    if (result) {
      sendWelcomeEmail(email,name);
      res.status(200).json({ message: "Account created successfully" });
    }
  });
};


