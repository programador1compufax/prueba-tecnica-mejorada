import { pool } from "../db/db.js";

class AddressService {

  async getAllAddresses() {
    // await knex('direeciones').select('*').orderBy('asc')
    const sql = `SELECT * FROM direcciones ORDER BY id ASC;`;
    let conn;

    try {
      conn = await pool.getConnection();
      const [addresses] = await conn.query(sql);
      return addresses;

    } catch (error) {
      console.error('Error:', error);
      throw error;

    } finally {
      if (conn) conn.release();
    }
  }

  async getAddressById( id ) {
    const sql = `SELECT * FROM direcciones WHERE id = ${id} LIMIT 1;`;
    let conn;

    try {
      conn = await pool.getConnection();
      const [rows] = await conn.query(sql);

      if (rows.length == 0) return null;

      return rows[0];

    } catch (error) {
      console.error('Error:', error);
      throw error;

    } finally {
      if (conn) conn.release();
    }
  }

  async updateAddress( id, addressData ){
    const fields = [];
    const values = [];

    if (addressData.calle !== undefined) {
      fields.push('calle = ?');
      values.push(addressData.calle);
    }
    if (addressData.ciudad !== undefined) {
      fields.push('ciudad = ?');
      values.push(addressData.ciudad);
    }
    if (addressData.codigo_postal !== undefined) {
      fields.push('codigo_postal = ?');
      values.push(addressData.codigo_postal);
    }

    // Nada que actualizar
    if (fields.length === 0) {
      return { updated: false, reason: 'no_fields' };
    }

    const sql = `UPDATE direcciones
                  SET ${fields.join(', ')}
                  WHERE id = ${id};`;               
    let conn;

    try {
      conn = await pool.getConnection();
      const [rows] = await conn.execute(sql, values);

      const addressUpdated = await this.getAddressById(id); 
      return addressUpdated;

    } catch (error) {
      console.error('Error:', error);
      throw error;

    } finally {
      if (conn) conn.release();
    }        
  }

}
export default new AddressService();