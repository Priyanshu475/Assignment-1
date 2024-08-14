# Rule Engine with AST
Objective:
 Develop a simple 3-tier rule engine application(Simple UI, API and Backend, Data) to determine
 user eligibility based on attributes like age, department, income, spend etc.The system can use
 Abstract Syntax Tree (AST) to represent conditional rules and allow for dynamic
 creation,combination, and modification of these rules.
<br>
 <br>
  <br>
![image](https://github.com/user-attachments/assets/80ef4383-0f69-4b75-8ef4-453bfa32666d)
 <br>
  <br>
# API Design
## Create Rule
![image](https://github.com/user-attachments/assets/c4f4ffa7-bf71-4b96-8bd3-9787fa4a2984)
 <br>
  <br>
## Combine Rules
![image](https://github.com/user-attachments/assets/0d6bf3fb-33dc-4006-b269-b80be47ee1f5)
 <br>
  <br>
## Evaluate Rule
![image](https://github.com/user-attachments/assets/45fb52c8-4f37-463a-9fa9-13463ca27d1d)
 <br>
  <br>

## Tech Stacks:
### FrontEnd: React.JS
### BackEnd: Node.JS
### Database: MongoDB
<br>
<br>

## Setup Instructions

### Server Setup - (present in root directory)
1. Install dependencies:
```
npm install
```
<br>
2. Set up environment variables:
- Create a `.env` file in the root directory
- Add the following variables (replace with your actual values):

  ```
  MONGO_URI = <MONGO_UR>
  PORT = <PORT>
  ```

3. Start the server
```
node server
```
<br>
<br>

### Client Setup 
1. Navigate to the client directory:
```
cd client
```
<br>
2. Install dependencies:

```
npm install
```
<br>
3. Set up environment variables:
- Create a `.env` file in the client directory
- Add the following variables (replace with your actual values):

  ```
  REACT_APP_API_URL= <URL>
  ```
<br>
4. Start the client:

```
npm start
```
<br>
<br>
<br>
<br>

# Thank You!!
