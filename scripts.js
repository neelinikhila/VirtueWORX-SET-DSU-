function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        let target = +stat.getAttribute('data-count');
        let count = 0;
        const increment = target / 100;

        const timer = setInterval(() => {
            count += increment;
            stat.textContent = Math.floor(count);

            if (count >= target) {
                stat.textContent = target;
                clearInterval(timer);
            }
        }, 10);
    });
}

// Run when stats section is visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(document.querySelector('.stats-container'));
// Syllabus data for all departments
const syllabusData = {
    cse: {
        title: "Computer Science & Engineering",
        highlights: [
            "Industry-oriented curriculum with latest technologies",
            "Hands-on projects and internships",
            "Focus on AI, ML, and Cloud Computing",
            "Placement assistance with top tech companies"
        ],
        years: {
            1: {
                semesters: {
                    1: [
                        { code: "MAT101", name: "Mathematics I", credits: 4 },
                        { code: "PHY101", name: "Physics", credits: 3 },
                        { code: "BEE101", name: "Basic Electrical Engineering", credits: 3 },
                        { code: "PFD101", name: "Programming Fundamentals", credits: 4 },
                        { code: "EG101", name: "Engineering Graphics", credits: 2 }
                    ],
                    2: [
                        { code: "MAT102", name: "Mathematics II", credits: 4 },
                        { code: "CHE101", name: "Chemistry", credits: 3 },
                        { code: "BEC101", name: "Basic Electronics", credits: 3 },
                        { code: "ME101", name: "Mechanical Engineering", credits: 3 },
                        { code: "EVS101", name: "Environmental Studies", credits: 2 }
                    ]
                }
            },
            2: {
                semesters: {
                    3: [
                        { code: "DS201", name: "Data Structures", credits: 4 },
                        { code: "DE201", name: "Digital Electronics", credits: 3 },
                        { code: "EM201", name: "Engineering Mechanics", credits: 3 },
                        { code: "PS201", name: "Probability & Statistics", credits: 3 },
                        { code: "PC201", name: "Professional Communication", credits: 2 }
                    ],
                    4: [
                        { code: "ALG202", name: "Algorithms", credits: 4 },
                        { code: "MP202", name: "Microprocessors", credits: 3 },
                        { code: "OOP202", name: "Object-Oriented Programming", credits: 4 },
                        { code: "DM202", name: "Discrete Mathematics", credits: 3 },
                        { code: "DBMS202", name: "Database Management Systems", credits: 4 }
                    ]
                }
            },
            3: {
                semesters: {
                    5: [
                        { code: "OS301", name: "Operating Systems", credits: 4 },
                        { code: "CN301", name: "Computer Networks", credits: 4 },
                        { code: "ML301", name: "Machine Learning", credits: 4 },
                        { code: "WT301", name: "Web Technologies", credits: 3 },
                        { code: "ELE301", name: "Elective I", credits: 3 }
                    ],
                    6: [
                        { code: "SE302", name: "Software Engineering", credits: 4 },
                        { code: "AI302", name: "Artificial Intelligence", credits: 4 },
                        { code: "CC302", name: "Cloud Computing", credits: 3 },
                        { code: "ELE302", name: "Elective II", credits: 3 },
                        { code: "MP302", name: "Mini Project", credits: 2 }
                    ]
                }
            },
            4: {
                semesters: {
                    7: [
                        { code: "CS401", name: "Cyber Security", credits: 4 },
                        { code: "IOT401", name: "Internet of Things", credits: 3 },
                        { code: "ELE401", name: "Elective III", credits: 3 },
                        { code: "ELE402", name: "Elective IV", credits: 3 },
                        { code: "PP401", name: "Project Phase I", credits: 4 }
                    ],
                    8: [
                        { code: "INT402", name: "Internship", credits: 6 },
                        { code: "PP402", name: "Project Phase II", credits: 8 },
                        { code: "CD402", name: "Career Development", credits: 2 }
                    ]
                }
            }
        }
    },
    // Add similar data structures for other departments...
    ai_ds: {
        title: "Artificial Intelligence & Data Science",
        highlights: ["Specialized AI curriculum", "Industry projects", "ML focus"],
        years: { /* ... */ }
    },
    cyber_security: {
        title: "Cyber Security",
        highlights: ["Security focus", "Ethical hacking", "Network security"],
        years: { /* ... */ }
    }
    // Add all other departments...
};

// Modal functionality
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('syllabusModal');
    const exploreButtons = document.querySelectorAll('.explore-syllabus');
    const closeModal = document.querySelector('.close-modal');
    const syllabusTabs = document.querySelectorAll('.syllabus-tab');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const syllabusContent = document.getElementById('syllabusContent');

    // Open modal
    exploreButtons.forEach(button => {
        button.addEventListener('click', function () {
            const department = this.getAttribute('data-department');
            loadSyllabus(department);
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Year tabs
    syllabusTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            syllabusTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const year = this.getAttribute('data-year');
            showYearContent(year);
        });
    });

    function loadSyllabus(department) {
        const data = syllabusData[department];
        if (!data) return;

        modalTitle.textContent = data.title;
        modalSubtitle.textContent = "Complete Curriculum Structure";

        // Load highlights
        let highlightsHTML = `
            <div class="department-highlights">
                <h4>Program Highlights</h4>
                ${data.highlights.map(highlight => `
                    <div class="highlight-item">
                        <i class="fas fa-check-circle"></i>
                        <span>${highlight}</span>
                    </div>
                `).join('')}
            </div>
        `;

        // Load first year content by default
        let yearContentHTML = '';
        Object.entries(data.years).forEach(([year, yearData]) => {
            yearContentHTML += `
                <div class="year-content" id="year-${year}">
                    <div class="semester-grid">
                        ${Object.entries(yearData.semesters).map(([semester, courses]) => `
                            <div class="semester-card">
                                <h4>Semester ${semester}</h4>
                                <ul class="course-list">
                                    ${courses.map(course => `
                                        <li>
                                            <span class="course-code">${course.code}</span>
                                            <span class="course-name">${course.name}</span>
                                            <span class="credits">${course.credits} Cr</span>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        });

        syllabusContent.innerHTML = highlightsHTML + yearContentHTML;

        // Show first year
        showYearContent('1');
    }

    function showYearContent(year) {
        document.querySelectorAll('.year-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(year - { year }).classList.add('active');
    }
});
