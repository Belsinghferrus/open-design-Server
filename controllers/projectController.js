import DB from "../config/db.js";

// Add a New Project
export const addProject = async (req, res) => {
        const { name, content, category, location, amenities, features, map_embed, image } = req.body;
        const user_id = req.user.id;

        try {
            const newProject = await DB.query(
                `INSERT INTO projects (name, content, category, location, image, amenities, features, map_embed, user_id)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
                [name, content, category, location, image, amenities, features, map_embed, user_id]
            );
            res.status(201).json({ message: "Project created successfully", project: newProject.rows[0] });
        } catch (error) {
            res.status(500).json({ message: "Error adding project", error: error.message });
        }
    
};

// Get All Projects
export const getProjects = async (req, res) => {
    try {
        const result = await DB.query("SELECT * FROM projects");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching projects", error });
    }
};

// Get Single Project
export const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await DB.query("SELECT * FROM projects WHERE id = $1", [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: "Project not found" });
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching project", error });
    }
};

// Update Project
export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, content, category, location, amenities, features, map_embed, image } = req.body;
        const result = await DB.query(
            "UPDATE projects SET name=$1, content=$2, category=$3, location=$4, amenities=$5, features=$6, map_embed=$7, image=$8 WHERE id=$9 RETURNING *",
            [name, content, category, location, amenities, features, map_embed, image, id]
        );
        res.status(200).json({ message: "Project updated", project: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating project", error });
    }
};

// Delete Project
export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        await DB.query("DELETE FROM projects WHERE id = $1", [id]);
        res.status(200).json({ message: "Project deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting project", error });
    }
};
