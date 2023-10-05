import pg from 'pg';

class NotesService {
  constructor() {
    const { Pool } = pg;
    this._pool = new Pool();
  }

  async getNotes(userId) {
    const query = {
      text: `SELECT notes.* FROM notes
      LEFT JOIN collaborations ON collaborations.note_id = notes.id
      WHERE notes.owner = $1 OR collaborations.user_id = $1
      GROUP BY notes_id`,
      values: [userId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}

export default NotesService;
