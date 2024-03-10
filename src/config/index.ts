import { env } from "~/env"

export const defaultJsCode = `// Define a class called Person
class Person {
    // Constructor
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    
    // Method to get the full name
    getFullName() {
        return \`\${this.firstName} \${this.lastName}\`;
    }
}

// Create an instance of Person
const person1 = new Person("John", "Doe");

// Access properties and call method
console.log(person1.getFullName()); // Output: John Doe
`

export const url = env.NEXT_PUBLIC_APP_URL
