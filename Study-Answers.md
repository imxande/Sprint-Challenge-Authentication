- [x] What is the purpose of using _sessions_?

- The purpuse of using sessions is to provide a way to persist data across requests. We use them to save authentication information, so there is no need to re-enter credentials for every new client request to the server.

- [x] What does bcrypt do to help us store passwords in a secure manner.

- Bycrypt provides password hashing function, implements salting both manually and automatically and accumulated hashing rounds. 

- [x] What does bcrypt do to slow down attackers?

- By adding what is call salt to slow down attackers. Bcrypt uses a modified key setup algorithm which is timely quite expensive.

- [x] What are the three parts of the JSON Web Token?

- Header, Payload and Signature.