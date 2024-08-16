import { PacienteService } from "../service/PacienteService";
import { Request, Response } from "express";

    const service:PacienteService = new PacienteService();

    export async function cadastrarPaciente(req: Request, res:Response){
        try {
            const novoPaciente = await service.novoPaciente(req.body);
            res.status(201).json(
                {
                    mensagem:"Paciente criado com sucesso!",
                    cliente:novoPaciente
                }
            );
        } catch (error: any) {
            res.status(400).json({ message: error.message});
        }
    }

    export async function atualizaPaciente(req: Request, res:Response){
        try {
            const paciente = await service.atualizaPaciente(req.body);
            res.status(200).json(
                    {
                        mensagem:"Paciente atualizado com sucesso!",
                        paciente:paciente
                    }
                );
        } catch (error: any) {
            res.status(400).json({ message: error.message});
        }
    }

    export async function deletaPaciente(req: Request, res:Response){
        try {
            const paciente = await service.deletaPaciente(req.body);
            res.status(200).json(
                    {
                        mensagem:"Paciente deletado com sucesso!",
                        paciente:paciente
                    }
                );
        } catch (error: any) {
            res.status(400).json({ message: error.message});
        }
    }

    export async function getPaciente(req: Request, res:Response){
        try {
            const paciente = await service.getPaciente(req.query.id,req.query.name,req.query.cpf);
            res.status(200).json(
                    {
                        paciente:paciente
                    }
                );
        } catch (error: any) {
            res.status(400).json({ message: error.message});
        }
    }

    export async function getPacientes(req: Request, res:Response){
        try {
            const cliente = await service.getPacientes();
            res.status(200).json(
                    {
                        clientes:cliente
                    }
                );
        } catch (error: any) {
            res.status(400).json({ message: error.message});
        }
    }