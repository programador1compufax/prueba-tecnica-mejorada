class FolioGenerator{
    generate() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randomPart = '';
        
        // Generar 6 caracteres alfanuméricos aleatorios
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomPart += characters[randomIndex];
        }
        
        return `TEST${randomPart}`;
    }
}
export default new FolioGenerator();