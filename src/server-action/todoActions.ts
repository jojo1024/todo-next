"use server"

import { _executeSql } from "@/database/mysqlDB";
import { ITask } from "@/store/task/taskSlice";
import { revalidatePath } from "next/cache";

export const addTask = (libTask: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = `INSERT INTO task (libTask) VALUES (?)`;
            const taskInserted: any = await _executeSql(sql, [libTask]);
            resolve({ idTask: taskInserted.insertId, libTask });
            revalidatePath("/");
        } catch (error) {
            reject(error)
            console.log("🚀 ~ file: task.ts:11 ~ returnnewPromise ~ error:", error)
        }
    })
}

export const updateTask = (data: ITask) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = `UPDATE task SET libTask = ? WHERE idTask = ?`;
            await _executeSql(sql, [data.libTask, data.idTask]);
            resolve({ status: 1, data });
            revalidatePath("/");
        } catch (error) {
            //    return  resolve({status: 1 , error});
            reject(error)
            // console.log("🚀 ~ file: task.ts:22 ~ returnnewPromise ~ error:", error)
        }
    })
}

export const deleteTask = (idTask: number) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = `DELETE FROM task WHERE idtask = ?`;
            await _executeSql(sql, [idTask]);
            resolve({ status: 1, data: idTask});
            revalidatePath("/");
        } catch (error) {
            reject(error)
            console.log("🚀 ~ file: task.ts:34 ~ returnnewPromise ~ error:", error)
        }
    })
}

export const getAllTasks = async () => {
    try {
        const sql = `SELECT * FROM task ORDER BY idTask DESC`;
        const data: any = await _executeSql(sql, []);

        // Convertir les résultats en objets simples
        const plainObjects = data.map((row: any) => Object.assign({}, row));

        return plainObjects;
    } catch (error) {
        console.log("🚀 ~ file: task.ts:46 ~ getAllTasks ~ error:", error);
        throw error;
    }
};
