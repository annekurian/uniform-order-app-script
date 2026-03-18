# School Uniform Order System

A simple web application built with React that allows parents to submit
school uniform orders. Orders are stored directly in Google Sheets
using a Google Apps Script Web App.

## Demo

Live App: https://uniform-orders.vercel.app

## Features

- Submit uniform orders from parents
- Supports multiple uniform types and sizes
- Stores orders in Google Sheets
- No backend server required
- Lightweight React + Tailwind UI

## Tech Stack

Frontend:

- React
- TypeScript
- Vite
- Tailwind CSS

Backend:

- Google Apps Script Web App

Database:

- Google Sheets

## Architecture

Browser (Parents) -> React App -> Google Apps Script Web App -> Google Sheets (stores orders)

## Running Locally

1. Clone the repository
   git clone https://github.com/annekurian/uniform-order-app-script.git

2. Install dependencies
   `bun init`

3. Start development server
   `bun run dev`

## Google Sheets Setup

4. Create a new Google Sheet
5. Add a sheet named `Orders`
6. Add the following headers

Date | Child Name | Class | Uniform | Size | Quantity | Price | Total

## Google Apps Script Setup

1. Open Google Sheet
2. Click Extensions → Apps Script
3. Add the following script: https://github.com/annekurian/uniform-order-app-script/blob/main/src/backend/Code.gs
4. Click Deploy → Web App
   Execute as: Me
   Access: Anyone

## Configuration

Update the API URL in src/webUrl.ts
const API_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"

## Request Payload

```
{
  "childName": "John",
  "childClass": "Grade 3",
  "items": [
    {
      "name": "Boy Shirt",
      "size": "M",
      "quantity": 2
    }
  ]
}
```
