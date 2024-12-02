document.addEventListener('DOMContentLoaded', function() {
    setupDepartmentChoices();
    document.getElementById('open-department-modal').addEventListener('click', openDepartmentModal);
});

function setupDepartmentChoices() {
    const departmentChoices = document.querySelectorAll('.department-choice');

    departmentChoices.forEach(choice => {
        choice.addEventListener('click', () => {
            const department = choice.getAttribute('data-department');
            showSemesters(department);
            document.getElementById('department-modal').style.display = 'none';
            document.getElementById('semester-modal').style.display = 'block';
        });
    });
}

function openDepartmentModal() {
    document.getElementById('department-modal').style.display = 'block';
}

function goBackToModal(modalId) {
    const currentModal = document.querySelector('.modal:not([style*="display: none"])');
    currentModal.style.display = 'none';

    document.getElementById(modalId).style.display = 'block';
}

function showSemesters(department) {
    const semesterOptions = document.getElementById('semester-options');
    semesterOptions.innerHTML = '';

    let semesters = [];
    if (department === 'general') {
        semesters = [1, 2];
    } else {
        semesters = [1, 2, 3, 4, 5, 6];
    }

    semesters.forEach(semester => {
        const semesterButton = document.createElement('button');
        semesterButton.textContent = `Semester ${semester}`;
        semesterButton.classList.add('semester-choice');
        semesterButton.setAttribute('data-semester', semester);
        semesterButton.addEventListener('click', () => {
            showSubjects(department, semester);
            document.getElementById('semester-modal').style.display = 'none';
            document.getElementById('subject-modal').style.display = 'block';
        });
        semesterOptions.appendChild(semesterButton);
    });
}


function showSubjects(department, semester) {
    const subjectOptions = document.getElementById('subject-options');
    subjectOptions.innerHTML = '';

    const subjects = getSubjects(department, semester);

    if (subjects.length === 0) {
        subjectOptions.innerHTML = '<p>No subjects found for this selection.</p>';
    } else {
        subjects.forEach(subjectName => {
            const subjectButton = document.createElement('button');
            subjectButton.textContent = subjectName;
            subjectButton.classList.add('subject-choice');
            subjectButton.setAttribute('data-subject', subjectName);
            subjectButton.addEventListener('click', () => {
                showResources(subjectName);
                document.getElementById('subject-modal').style.display = 'none';
                document.getElementById('resource-area').style.display = 'block';
            });
            subjectOptions.appendChild(subjectButton);
        });
    }
}

function showResources(subject) {
    const resourceList = document.getElementById('resource-list');
    resourceList.innerHTML = '';

    const resources = getResources(subject) || {};

    const resourceTypeButtons = document.querySelectorAll('.resource-type-button');
    resourceTypeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const resourceType = button.getAttribute('data-type');
            displayResourcesByType(resources, resourceType);
        });
    });

    displayResourcesByType(resources, 'textbook');
}

function displayResourcesByType(resources, resourceType) {
    const resourceList = document.getElementById('resource-list');
    resourceList.innerHTML = '';

    if (resourceType === 'modules') {
        let hasModules = false; // Flag to check if any modules exist
        for (let i = 1; i <= 4; i++) {
            const moduleKey = `module${i}`;
            if (resources[moduleKey]) {
                addResourceLink(resourceList, resources[moduleKey].name, resources[moduleKey].link);
                hasModules = true;
            }
        }
        if (!hasModules) {
            resourceList.innerHTML = '<p>No modules available.</p>';
        }
    } else if (resourceType === 'studynote') {
        let hasStudyNotes = false; // Flag to check if any study notes exist
        for (let i = 1; i <= 4; i++) {
            const noteKey = `studynote${i}`;
            if (resources[noteKey]) {
                addResourceLink(resourceList, resources[noteKey].name, resources[noteKey].link);
                hasStudyNotes = true;
            }
        }
        if (!hasStudyNotes) {
            resourceList.innerHTML = '<p>No study notes available.</p>';
        }
    } else if (resourceType === 'qpaper') {
        if (resources.qpaper && resources.qpaper.length > 0) {
            resources.qpaper.forEach(manual => {
                addResourceLink(resourceList, manual.name, manual.link);
            });
        } else {
            resourceList.innerHTML = '<p>No question paper available.</p>';
        }
    }
}


function addResourceLink(container, name, link) {
    if (!name || !link) {
        return;
    }
    const listItem = document.createElement('a');
    listItem.href = link;
    listItem.textContent = name;
    listItem.target = "_blank";
    container.appendChild(listItem);
}

function getSubjects(department, semester) {
    const subjectData = {
        general: {
            1: ['Communication Skills in English', 'Mathematics I', 'Applied Physics I', 'Applied Chemistry'],
            2: ['Mathematics II', 'Applied Physics II', 'Environmental Science']
        },
        computer: {
            1: ['Subject 1', 'Subject 2', 'Subject 3', 'Subject 4'],
            2: ['Problem Solving & Programming', 'Fundamentals of Electrical & Electronics Engg'],
            3: ['Computer Organisation', 'Programming in C', 'Database Management Systems', 'Digital Computer Fundamentals', 'Web Technology Lab'],
            4: ['Object Oriented Programming', 'Computer Communication and Networks', 'Data Structures'],
            5: ['Project Management and Software Engineering', 'Embedded System and Real time Operating System', 'Operating System', 'Virtualization Technology & Cloud Computing (Elective)'],
            6: ['Subject 1', 'Subject 2', 'Subject 3', 'Subject 4']
        },
        electronics: {
            1: ['Subject 1', 'Subject 2', 'Subject 3', 'Subject 4'],
            2: ['Subject 1', 'Subject 2', 'Subject 3', 'Subject 4'],
            3: ['Electric Circuits & Networks', 'Principles of Electronic Communication', 'Electronic Circuits', 'Digital Electronics', 'Fundamentals of C Programming'],
            4: ['Microcontroller and Applications', 'Electronic Measurements and Instrumentation', 'Linear Integrated Circuits'],
            5: ['Industrial Management and Safety', 'Embedded Systems', 'Industrial Automation', 'Digital Communication (Elective)'],
            6: ['Subject 1', 'Subject 2', 'Subject 3', 'Subject 4']
        },
        mechanical: {
            1: ['Subject 1', 'Subject 2', 'Subject 3', 'Subject 4'],
            2: ['Manufacturing Technology', 'Engineering Mechanics'],
            3: ['Strength of Materials', 'Material Science and Metrology', 'Machine Tools', 'Fundamentals of Electrical Engineering'],
            4: ['Thermal Engineering', 'Fluid Mechanics and Hydraulic Machines', 'Automobile Engineering', 'Industrial Engineering'],
            5: ['Industrial Management and Safety', 'Design Of Machine Elements', 'Refrigeration and Air conditioning', 'Modern Production Process(Elective)'],
            6: ['Subject 1', 'Subject 2', 'Subject 3', 'Subject 4']
        }
    };

    return subjectData[department][semester] || [];
}


function getResources(subject) {
    const resources = {
        'Communication Skills in English': {
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: './materials/general/Sem%201/English%20/Module%201/Notes%20The%20Gift%20of%20Magi.pdf' },
            studynote2: { name: 'Study Note 2', link: './materials/general/Sem%201/English%20/Module%202/Stopping%20by%20the%20woods%20on%20a%20snowy%20evening%20.pdf' },
            studynote3: { name: 'Study Note 3', link: './materials/general/Sem%201/English%20/Module%203/AN%20ASTROLOGER%E2%80%99S%20DAY%20(4).pdf' },
            studynote4: { name: 'Study Note 4', link: './/materials/general/Sem%201/English%20/Module%204/full.pdf' },
            qpaper: [{ name: 'Question Paper', link: './materials/general/Sem%201/English%20/Model%20question%20paper%20/model%20question%20paper.pdf' }]
        },
        'Mathematics I': {
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: './materials/general/Sem 1/Maths /Module 1 /mod-1.pdf' },
            studynote2: { name: 'Study Note 2', link: './materials/general/Sem 1/Maths /Module 2 /mod-2.pdf' },
            studynote3: { name: 'Study Note 3', link: './materials/general/Sem 1/Maths /Module 3 /mod-3.pdff' },
            studynote4: { name: 'Study Note 4', link: './materials/general/Sem 1/Maths /Module 4 /mod-4.pdf' },
            qpaper: [{ name: 'Question Paper', link: './materials/general/Sem 1/Maths /Model question paper /modelquestionpaper.pdf' }]
        },
        'Microcontroller and Applications': {
            textbook: [{ name: 'Microcontroller and Applications Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Applied Physics I': {
            textbook: [{ name: 'Applied Physics I Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Applied Chemistry': {
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: './materials/general/Sem 1/Chemistry /Module 1 /mod-1.pdf' },
            studynote2: { name: 'Study Note 2', link: './materials/general/Sem 1/Chemistry /Module 2 /mod-2.pdf' },
            studynote3: { name: 'Study Note 3', link: './materials/general/Sem 1/Chemistry /Module 3 /mod-3.pdf' },
            studynote4: { name: 'Study Note 4', link: './materials/general/Sem 1/Chemistry /Module 4 /mod-4.pdf' },
            qpaper: [{ name: 'Question Paper', link: './materials/general/Sem 1/Chemistry /Model question paper /modelquestionpaper.pdf' }]
        },
        'Mathematics II': {
            textbook: [{ name: 'Mathematics II Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Applied Physics II': {
            textbook: [{ name: 'Applied Physics II Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Environmental Science': {
            textbook: [{ name: 'Environmental Science Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Problem Solving & Programming': {
            textbook: [{ name: 'Problem Solving & Programming Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Fundamentals of Electrical & Electronics Engg': {
            textbook: [{ name: 'Fundamentals of Electrical & Electronics Engg Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Computer Organisation': {
            textbook: [{ name: 'Computer Organisation Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Programming in C': {
            textbook: [{ name: 'Programming in C Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Database Management Systems': {
            textbook: [{ name: 'Database Management Systems Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Digital Computer Fundamentals': {
            textbook: [{ name: 'Digital Computer Fundamentals Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Web Technology Lab': {
            textbook: [{ name: 'Web Technology Lab Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Object Oriented Programming': {
            textbook: [{ name: 'Object Oriented Programming Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Computer Communication and Networks': {
            textbook: [{ name: 'Computer Communication and Networks Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Data Structures': {
            textbook: [{ name: 'Data Structures Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Project Management and Software Engineering': {
            textbook: [{ name: 'Project Management and Software Engineering Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Embedded System and Real time Operating System': {
            textbook: [{ name: 'Embedded System and Real time Operating System Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Operating System': {
            textbook: [{ name: 'Operating System Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Virtualization Technology & Cloud Computing (Elective)': {
            textbook: [{ name: 'Virtualization Technology & Cloud Computing (Elective) Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Electric Circuits & Networks': {
            textbook: [{ name: 'Electric Circuits & Networks Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Principles of Electronic Communication': {
            textbook: [{ name: 'Principles of Electronic Communication Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Electronic Circuits': {
            textbook: [{ name: 'Electronic Circuits Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Digital Electronics': {
            textbook: [{ name: 'Digital Electronics Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Fundamentals of C Programming': {
            textbook: [{ name: 'Fundamentals of C Programming Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Manufacturing Technology': {
            textbook: [{ name: 'Manufacturing Technology Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Engineering Mechanics': {
            textbook: [{ name: 'Engineering Mechanics Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Strength of Materials': {
            textbook: [{ name: 'Strength of Materials Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Material Science and Metrology': {
            textbook: [{ name: 'Material Science and Metrology Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Machine Tools': {
            textbook: [{ name: 'Machine Tools Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Fundamentals of Electrical Engineering': {
            textbook: [{ name: 'Fundamentals of Electrical Engineering Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        }, 'Thermal Engineering': {
            textbook: [{ name: 'Thermal Engineering Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Fluid Mechanics and Hydraulic Machines': {
            textbook: [{ name: 'Fluid Mechanics and Hydraulic Machines Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Automobile Engineering': {
            textbook: [{ name: 'Automobile Engineering Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Industrial Management and Safety': {
            textbook: [{ name: 'Industrial Management and Safety Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Design Of Machine Elements': {
            textbook: [{ name: 'Design Of Machine Elements Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Refrigeration and Air conditioning': {
            textbook: [{ name: 'Refrigeration and Air conditioning Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Modern Production Process(Elective)': {
            textbook: [{ name: 'Modern Production Process(Elective) Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Industrial Management and Safety ': {
            textbook: [{ name: 'Industrial Management and Safety Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Embedded Systems': {
            textbook: [{ name: 'Embedded Systems Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Industrial Automation': {
            textbook: [{ name: 'Industrial Automation Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
        'Digital Communication (Elective)': {
            textbook: [{ name: 'Digital Communication (Elective) Textbook', link: '#' }],
            module1: { name: 'Module 1', link: '#' },
            module2: { name: 'Module 2', link: '#' },
            module3: { name: 'Module 3', link: '#' },
            module4: { name: 'Module 4', link: '#' },
            studynote1: { name: 'Study Note 1', link: '#' },
            studynote2: { name: 'Study Note 2', link: '#' },
            studynote3: { name: 'Study Note 3', link: '#' },
            studynote4: { name: 'Study Note 4', link: '#' },
            labmanual: [{ name: 'Lab Manual', link: '#' }]
        },
    };

    return resources[subject];
}
