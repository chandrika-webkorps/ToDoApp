import supertest from 'supertest'
import app from './app'
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

describe("POST  /new-user",()=>{
    describe("given a username and password", ()=>{
           test("Should respond with a 200 status code",async()=>{
            const response=await supertest(app).post("/new-user").send({
                 name: "Test User",
                email: "testuser@example.com",
                password: "password123"
            })
            expect(response.statusCode).toBe(200)
           })
    })

})