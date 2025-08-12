import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateContactDto,
  ) {
    try {
      await this.contactService.create(
        createUserDto,
      );

      return {
        success: true,
        message: 'Data Created Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get()
  async findAll() {
    try {
      const data =
        await this.contactService.findAll();
      return {
        success: true,
        data,
        message: 'Contact Fetched Successfully',
      };
    } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new NotFoundException('Failed to get contact');
    }
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string) {
    try {
      const data = await this.contactService.findOne(
        uuid,
      );
      return {
        success: true,
        data,
        message: 'Contact Fetched Successfully',
      };
    } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new NotFoundException('Failed to get contact');
    }
  }

  @Patch(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    try {
      await this.contactService.update(
        uuid,
        updateContactDto,
      );
      return {
        success: true,
        message: 'Contact Updated Successfully',
      };
    } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new NotFoundException('Failed to update contact');
    }
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string) {
    try {
      await this.contactService.remove(uuid);
      return {
        success: true,
        message: 'Deleted Successfully',
      };
    } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new NotFoundException('Failed to delete contact');
    }
  }
}
