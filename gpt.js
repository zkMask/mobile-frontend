import axios from 'axios';
import { Configuration, OpenAIApi } from "openai";
import express from 'express';
require('dotenv').config()
const app = express();


 
  const configuration = new Configuration({
    organisation : process.env.ORGANISATION,
    apiKey: process.env.OPENAI_API_KEY
  });

  const openai = new OpenAIApi(configuration);

  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return ;
  }

  // Getting the function signature

  const transaction = {
    data: '0xaa67c91900000000000000000000000084ebf92fa78e90832a52f1b8b7c1eb35487c091b',
    to: '0x000031dd6d9d3a133e663660b959162870d755d4' // Replace with your actual transaction data
  };
  
  const data = transaction.data.split('0x')[1];
  console.log('Data:', data);

  const transactionData = data.split('0x')[0];
  const functionSignature = transactionData.slice(0, 8);

  console.log("Function signature",functionSignature);


  // Fetching the response for contract details
  const info = await axios.get(
    `http://20.219.55.140:7777/description?contract_addr=${transaction.to}&four_byte=${functionSignature}`,
  );

  const completion = await openai.createCompletion({
    model: "gpt-3.5-turbo",
   messages: [
   { role: "user",
    content : functionSignature}
   ],
    temperature: 0.6,
  });


  console.log(completion.data.choices[0].messages);

    // Parsing the response
//   const ret = await info.json();
// console.log("##########################################################################################");
// console.log(ret);
// console.log("##########################################################################################");

//   return {
//     insights: ret,
//   };



