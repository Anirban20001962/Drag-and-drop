var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from './base-component.js';
import { validatable } from '../util/validation.js';
import { projectState } from '../state/project.js';
import { autobind } from '../decorators/autobind.js';
export class ProjectInput extends Component {
    constructor() {
        super('project-input', 'app', true, 'user-input');
        this.titleInputElement = document.querySelector('#title');
        this.descriptionElement = document.querySelector('#description');
        this.peopleInputElement = document.querySelector('#people');
        this.configure();
    }
    gatherUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionElement.value;
        const enteredPeople = this.peopleInputElement.value;
        const titleValidatable = {
            value: enteredTitle,
            required: true,
        };
        const descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 1,
        };
        const peopleValidatable = {
            value: enteredPeople,
            required: true,
            min: 1,
            max: 5,
        };
        if (validatable(titleValidatable) &&
            validatable(descriptionValidatable) &&
            validatable(peopleValidatable)) {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
        else {
            alert('Invalid input, please try again');
            return;
        }
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            projectState.addProject(title, desc, people);
            this.clearInputs();
        }
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionElement.value = '';
        this.peopleInputElement.value = '';
    }
    renderContent() { }
}
__decorate([
    autobind
], ProjectInput.prototype, "submitHandler", null);
