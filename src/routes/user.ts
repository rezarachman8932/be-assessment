import { Router } from "express";
import prisma from "../db/prisma";

const router = Router();

// POST /user
router.post("/", async (req, res) => {
  const { firstName, lastName, birthday, email, timezone } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        birthday: new Date(birthday),
        email,
        timezone,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// DELETE /user/:id
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const deleted = await prisma.user.delete({
        where: { id },
      });
  
      res.status(200).json({ message: "User deleted", user: deleted });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(404).json({ error: "User not found" });
    }
  });

  // PUT /user/:id
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, birthday, email, timezone } = req.body;
  
    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          firstName,
          lastName,
          birthday: birthday ? new Date(birthday) : undefined,
          email,
          timezone,
        },
      });
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(400).json({ error: "Failed to update user" });
    }
});

// GET /user
router.get("/", async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
});  
  

export default router;
