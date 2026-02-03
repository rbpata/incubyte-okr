import { Injectable, Body } from '@nestjs/common';
import { type ObjectiveDto } from './dto/objective.dto';
import { Pool } from 'pg';

@Injectable()
class ObjectiveService {
  pool = new Pool({
    user: 'postgres',
    database: 'okrs',
    password: 'postgres',
    port: 5432,
  });

  private objective: ObjectiveDto[] = [];
  getObjectives(): { objectives: ObjectiveDto[] } {
    return {
      objectives: this.objective,
    };
  }
  getALl() {
    const query = "SELECT * FROM objectives";
    const result = this.pool.query(query);
    return result
      .then((res) => res.rows)
      .catch((err) => {
        console.error('Error executing query', err.stack);
        return [];
      });
  }

  async create(createObjectiveDto: ObjectiveDto){
    const query = `INSERT INTO objectives (title) VALUES ($1)`;


    const result = await this.pool.query(query, [createObjectiveDto.title]);

    if(result.rowCount === 0){
      throw new Error('Failed to create objective');
    }


    return { message: 'Objective created successfully' };

  }
}

export default ObjectiveService;
