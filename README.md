# School Uniform Order System

A lightweight web application for collecting school uniform orders from parents.
The application allows parents to submit uniform orders through a simple React form and stores all orders directly in Google Sheets using Google Apps Script, eliminating the need for a traditional backend server. The application also sends an email notification for the order submitted.

This project demonstrates how to build a serverless data collection system using modern frontend technologies.

## Demo

Live App: [https://uniform-order-system.vercel.app](https://uniform-order-system.vercel.app/)

## Features

- Submit uniform orders from parents
- Supports multiple uniform types and sizes
- Stores orders in Google Sheets
- Email notification for the orders placed
- No backend server required
- Serverless architecture (no backend required)
- Simple and responsive user interface (Lightweight React + Tailwind UI)
- Easy to deploy and maintain

## Tech Stack

Frontend:

- React
- TypeScript
- Vite
- Tailwind CSS
- React Hook Form
- Zod(form validation)

Backend:

- Google Apps Script Web App

Database:

- Google Sheets

Deployment:

- Vercel or Netlify

## Architecture

Browser (Parents) -> React Frontend application -> Google Apps Script Web API -> Google Sheets (Order Storage) -> Sends Email notification for the submitted order

The React app sends order data to a Google Apps Script Web App endpoint which writes the data into a Google Sheet.

## Running Locally

1. Clone the repository:

   ```
   git clone https://github.com/annekurian/uniform-order-app-script.git
   cd uniform-order-app-script
   ```

2. Install dependencies
   `bun init`

3. Start development server
   `bun run dev`

The application will run at http://localhost:5173

## Google Sheets Setup

4. Create a new Google Sheet
5. Rename sheet tab to `Orders`
6. Add the following headers

Date | Child Name | Class | Uniform | Size | Quantity | Price | Total

## Google Apps Script Setup

1. Open Google Sheet
2. Click Extensions → Apps Script
3. Add the following script: https://github.com/annekurian/uniform-order-app-script/blob/main/src/backend/Code.gs
4. Click Deploy -> New Deployment -> Web App
   |Setting |Value |
   |----------------|--------|
   |Execute As | Me |
   |Who Has Access | Anyone |

You will receive a Web App URL like https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

## Configure React API Endpoint

Update the API URL in your React application. Paste the URL in the file src/webUrl.ts

`const API_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"`

## Request Payload

Example order request sent to the API:

```
{
  "childName": "John",
  "childClass": "Grade 3",
  "items": [
    {
      "name": "Boy's Shirt",
      "size": "M",
      "quantity": 2,
      "price": 31.5,
      "total": 63
    }
  ]
}
```
