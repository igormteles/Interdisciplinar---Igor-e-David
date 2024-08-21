import { MedicoService } from "../service/MedicoService";
import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { MedicoDto } from "../model/dto/MedicoDto"
import { MedicoRequestDto } from "../model/dto/MedicoRequestDto";


@Route("medico")
@Tags("Medico")
export class MedicoController extends Controller {

    service = new MedicoService();

    @Post()
    async cadastrarMedico(
        @Body() dto: MedicoRequestDto,
        @Res() fail: TsoaResponse <400, BasicResponseDto>,
        @Res() success: TsoaResponse <201, BasicResponseDto>
    ): Promise<void>{
        try {
            const novoMedico = await this.service.novoMedico(dto);
            return success(201, new BasicResponseDto(
                "Medico Cadastrado com sucesso!!!", 
                novoMedico
            ))
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined))
        }
    }

    @Put()
    async atualizaMedico(
        @Body() dto: MedicoDto,
        @Res() notFound: TsoaResponse <400, BasicResponseDto>,
        @Res() success: TsoaResponse <201, BasicResponseDto>
    ): Promise<void>{
        try {
            const medico = await this.service.atualizaMedico(dto);
            return success(201, new BasicResponseDto(
                        "Medico atualizado com sucesso!",
                        medico
                ));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Delete()
    async deletaMedico(
        @Body() dto: MedicoDto,
        @Res() notFound: TsoaResponse <400, BasicResponseDto>,
        @Res() success: TsoaResponse <201, BasicResponseDto>
    ): Promise<void>{
        try {
            const medico = await this.service.deletaMedico(dto);
            return success(201, new BasicResponseDto(
                        "Medico deletado com sucesso!",
                        medico       
                ));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("buscar/{crm}")
    async getMedico(
        @Path() crm:number,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
        try {
            const medico = await this.service.getMedicoCrm(crm);
            return success(200, new BasicResponseDto(
                        "Medico encontrado: ",
                        medico
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
            const medico = await this.service.getMedicoId(id);
            return success(200, new BasicResponseDto(
                        "Medico encontrado: ",
                        medico
                ));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("todos")
    async getMedicos(
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ){
        try {
            const cliente = await this.service.getMedicos();
            return success(200, new BasicResponseDto(
                        "Lista de medicos",
                        cliente
                ));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
}
    