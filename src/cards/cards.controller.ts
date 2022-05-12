import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @Get(':id')
  open(@Param('id') id: string) {
    return this.cardsService.open(id);
  }

  @Get('draw/:count/:id')
  draw(@Param('id') id: string, @Param('count') count: string) {
    return this.cardsService.draw(id, +count);
  }
}
