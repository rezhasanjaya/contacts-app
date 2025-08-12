import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactEntity } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { Repository } from 'typeorm';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactEntity)
    private readonly contactRepository: Repository<ContactEntity>,
  ) {}

  async create(
    CreateContactDto: CreateContactDto,
  ): Promise<ContactEntity> {
    const userData =
      await this.contactRepository.create(
        CreateContactDto,
      );
    return this.contactRepository.save(userData);
  }

  async findAll(): Promise<ContactEntity[]> {
    const data = await this.contactRepository.find();
    return data
  }

  async findOne(uuid: string): Promise<ContactEntity> {
    const contactData =
      await this.contactRepository.findOneBy({ uuid });
    if (!contactData) {
      throw new HttpException(
        'Not Found',
        404,
      );
    }
    return contactData;
  }

  async update(
    uuid: string,
    updateContactDto: UpdateContactDto,
  ): Promise<ContactEntity> {
    const existingUser = await this.findOne(uuid);
    const userData = this.contactRepository.merge(
      existingUser,
      updateContactDto,
    );
    if (!userData) {
      throw new HttpException(
        'Not Found',
        404,
      );
    }
    return await this.contactRepository.save(
      userData,
    );
  }

  async remove(uuid: string): Promise<ContactEntity> {
    const existingUser = await this.findOne(uuid);
    if (!existingUser) {
      throw new HttpException(
        'Not Found',
        404,
      );
    }
    return await this.contactRepository.remove(
      existingUser,
    );
  }

}
