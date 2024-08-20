import { PacienteService } from "../service/PacienteService";
import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { PacienteDto } from "../model/dto/PacienteDto"
import { PacienteRequestDto } from "../model/dto/PacienteRequestDto";


@Route("paciente")
@Tags("Paciente")
export class PacienteController extends Controller {

    service = new PacienteService();

    @Post()
    async cadastrarPaciente(
        @Body() dto: PacienteRequestDto,
        @Res() fail: TsoaResponse <400, BasicResponseDto>,
        @Res() success: TsoaResponse <201, BasicResponseDto>
    ): Promise<void>{
        try {
            const novoPaciente = await this.service.novoPaciente(dto);
            return success(201, new BasicResponseDto(
                "Paciente Cadastrado com sucesso!!!", 
                novoPaciente
            ))
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined))
        }
    }

    @Put()
    async atualizaPaciente(
        @Body() dto: PacienteDto,
        @Res() notFound: TsoaResponse <400, BasicResponseDto>,
        @Res() success: TsoaResponse <201, BasicResponseDto>
    ): Promise<void>{
        try {
            const paciente = await this.service.atualizaPaciente(dto);
            return success(201, new BasicResponseDto(
                        "Paciente atualizado com sucesso!",
                        paciente
                ));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Delete()
    async deletaPaciente(
        @Body() dto: PacienteDto,
        @Res() notFound: TsoaResponse <400, BasicResponseDto>,
        @Res() success: TsoaResponse <201, BasicResponseDto>
    ): Promise<void>{
        try {
            const paciente = await this.service.deletaPaciente(dto);
            return success(201, new BasicResponseDto(
                        "Paciente deletado com sucesso!",
                        paciente       
                ));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("busca/{id}")
    async getPaciente(
        @Path() id:number,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
        try {
            const paciente = await this.service.getPacienteId(id);
            return success(200, new BasicResponseDto(
                        "Paciente encontrado: ",
                        paciente
                ));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("todos")
    async getPacientes(
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ){
        try {
            const cliente = await this.service.getPacientes();
            return success(200, new BasicResponseDto(
                        "Lista de pacientes",
                        cliente
                ));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
}
    