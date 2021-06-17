import { Component } from './base-component';
import { Validatable, validatable } from '../util/validation';
import { projectState } from '../state/project';
import { autobind } from '../decorators/autobind';

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
	titleInputElement: HTMLInputElement;
	descriptionElement: HTMLInputElement;
	peopleInputElement: HTMLInputElement;

	constructor() {
		super('project-input', 'app', true, 'user-input');
		this.titleInputElement = document.querySelector(
			'#title'
		)! as HTMLInputElement;
		this.descriptionElement = document.querySelector(
			'#description'
		)! as HTMLInputElement;
		this.peopleInputElement = document.querySelector(
			'#people'
		)! as HTMLInputElement;
		this.configure();
	}

	private gatherUserInput(): [string, string, number] | void {
		const enteredTitle = this.titleInputElement.value;
		const enteredDescription = this.descriptionElement.value;
		const enteredPeople = this.peopleInputElement.value;
		const titleValidatable: Validatable = {
			value: enteredTitle,
			required: true,
		};
		const descriptionValidatable: Validatable = {
			value: enteredDescription,
			required: true,
			minLength: 1,
		};
		const peopleValidatable: Validatable = {
			value: enteredPeople,
			required: true,
			min: 1,
			max: 5,
		};
		if (
			validatable(titleValidatable) &&
			validatable(descriptionValidatable) &&
			validatable(peopleValidatable)
		) {
			return [enteredTitle, enteredDescription, +enteredPeople];
		} else {
			alert('Invalid input, please try again');
			return;
		}
	}

	@autobind
	private submitHandler(event: Event) {
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
	private clearInputs() {
		this.titleInputElement.value = '';
		this.descriptionElement.value = '';
		this.peopleInputElement.value = '';
	}
	renderContent() {}
}
