import bcrypt from 'bcrypt';

export class PasswordService {
    private static readonly saltRounds = 10;

    public static async hashPassword(password: string): Promise<string> {
        try {
            const hash = await bcrypt.hash(password, this.saltRounds);
            return hash;
        } catch (error) {
            throw new Error('Error hashing password');
        }
    }

    public static async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
        try {
            const match = await bcrypt.compare(plainPassword, hashedPassword);
            return match;
        } catch (error) {
            throw new Error('Error comparing passwords');
        }
    }
}
