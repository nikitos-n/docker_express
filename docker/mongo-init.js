db.createUser(
    {
      user: "nikita_user",
      pwd: "nikos_99",
      roles: [
        {
          role: "readWrite",
          db: "nikita_mongo"
        }
      ]
    }
  );