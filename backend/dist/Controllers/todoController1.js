import * as path from "path";
import * as fs from "fs/promises";
import { fileURLToPath } from 'url';
function getDirname(importMetaUrl) {
    const filename = fileURLToPath(importMetaUrl);
    return path.dirname(filename);
}
const __dirname = getDirname(import.meta.url);
const filePath = path.join(__dirname, '..', "ToDo.json");
export const addTask = async (req, res) => {
    const values = req.body;
    console.log("typescript: ", values);
    try {
        let data = "";
        let jsonData = [];
        try {
            data = await fs.readFile(filePath, "utf-8");
            jsonData = JSON.parse(data);
        }
        catch (err) {
            if (err.code === "ENOENT") {
                console.log("File not found! Creating a new one.");
                await fs.writeFile(filePath, JSON.stringify([], null, 2), "utf-8");
            }
        }
        jsonData.push(values);
        await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), "utf-8");
        return res.status(200).json({ message: "New Task added", allTasks: jsonData });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
export const toggleTask = async (req, res) => {
    const { id, done } = req.body;
    try {
        const jsonData = await fs.readFile(filePath, "utf-8");
        const parsedData = JSON.parse(jsonData);
        const updatedData = parsedData.map((task) => {
            if (task.id === id) {
                return { ...task, done: !done };
            }
            return task;
        });
        await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), "utf-8");
        return res.status(200).json({ message: "Updated task list is: ", updatedData });
    }
    catch (err) {
        return res.status(500).json({ message: "Something went wrong", details: err });
    }
};
export const getTasks = async (req, res) => {
    try {
        const jsonData = await fs.readFile(filePath, "utf-8");
        const parsedData = JSON.parse(jsonData);
        return res.status(200).json({ Message: "Fetching all tasks: ", allTasks: parsedData });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error", details: err });
    }
};
export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const jsonData = await fs.readFile(filePath, "utf-8");
        const parsedData = JSON.parse(jsonData);
        const dataAfterDelete = parsedData.filter((task) => String(task.id) === String(id));
        await fs.writeFile(filePath, JSON.stringify(dataAfterDelete, null, 2), "utf-8");
    }
    catch (err) {
        console.log("Error deleting task: ", err);
        return res.status(500).json({ message: "Error deleting task from todos ", details: err });
    }
};
