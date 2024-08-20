import { ExameService } from "../service/ExameService";
import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { ExameDto } from "../model/dto/ExameDto"
import { ExameRequestDto } from "../model/dto/ExameRequestDto";


@Route("exame")
@Tags("Exame")
export class ExameController extends Controller {

    service = new ExameService();

    @Post()
    async cadastrarExame(
        @Body() dto: ExameRequestDto,
        @Res() fail: TsoaResponse <400, BasicResponseDto>,
        @Res() success: TsoaResponse <201, BasicResponseDto>
    ): Promise<void>{
        try {
            const novoExame = await this.service.novoExame(dto);
            return success(201, new BasicResponseDto(
                "Exame agendado com sucesso!!!", 
                novoExame
            ))
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined))
        }
    }

    @Put()
    async atualizaExame(
        @Body() dto: ExameDto,
        @Res() notFound: TsoaResponse <400, BasicResponseDto>,
        @Res() success: TsoaResponse <201, BasicResponseDto>
    ): Promise<void>{
        try {
            const exame = await this.service.atualizaExame(dto);
            return success(201, new BasicResponseDto(
                        "Exame atualizado com sucesso!",
                        exame
                ));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Delete()
    async deletaExame(
        @Body() dto: ExameDto,
        @Res() notFound: TsoaResponse <400, BasicResponseDto>,
        @Res() success: TsoaResponse <201, BasicResponseDto>
    ): Promise<void>{
        try {
            const exame = await this.service.deletaExame(dto);
            return success(201, new BasicResponseDto(
                        "Exame desmarcado com sucesso!",
                        exame       
                ));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("busca/{pacienteID}")
    async getExame(
        @Path() pacienteID:string,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
        try {
            const exame = await this.service.getExame(pacienteID);
            return success(200, new BasicResponseDto(
                        "Exame do paciente: ",
                        exame
                ));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("todos")
    async getExames(
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ){
        try {
            const exames = await this.service.getExames();
            return success(200, new BasicResponseDto(
                        "Exames Agendados",
                        exames
                ));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
}
    