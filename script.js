// --- Constants for Data Files (Future Use) ---
// const AGGREGATED_SCORES_CSV_URL = 'data/DashboardFeed_AggregatedScores.csv'; 
// const QUESTION_DETAILS_CSV_URL = 'data/DashboardFeed_QuestionDetails.csv'; 

// --- Date Formatting Helper ---
function formatDate(dateString) {
    if (!dateString || dateString === "N/A" || dateString === "Not Attempted") return dateString;
    try {
        const date = new Date(dateString + 'T00:00:00');
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return `${day} ${month}, ${year}`;
    } catch (e) {
        console.warn("Could not format date:", dateString);
        return dateString;
    }
}

// --- Dummy Data ---
let currentStudentData = {
    name: "Alex Johnson",
    targetScore: 1400,
    latestScores: { total: 1250, rw: 620, math: 630, avgEocKhan: 78 },
    classAveragesGlobal: { total: 1180, rw: 590, math: 590, avgEocKhan: 75 },
    scoreTrend: { labels: ['Diag', 'Test 1', 'Test 2', 'Test 3', 'Test 4'], studentScores: [1130, 1220, 1250, 1280, 1310], classAvgScores: [1050, 1150, 1180, 1200, 1220] },
    overallSkillPerformance: { labels: ['Reading', 'Writing & Language', 'Math'], studentAccuracy: [78, 82, 75], classAvgAccuracy: [75, 79, 72] },
    timeSpent: { studentAvg: 120, studentUnit: "min / day", classAvg: 130, classUnit: "min / day"},
    cbPracticeTests: [
        { 
            name: "Diagnostic Test", 
            date: "2024-03-01", rw: "550", math: "580", total: "1130", 
            classAvgRW: "520", classAvgMath: "530", classAvgTotal: "1050",
            questionDetails: [
                { text: "Solve for x: 3x - 7 = 5", yourAnswer: "x = 4", isCorrect: true, status: 'answered' },
                { text: "Identify the main theme of the passage.", yourAnswer: "The role of technology", isCorrect: true, status: 'answered' },
                { text: "What is the value of 4! (factorial)?", yourAnswer: "12", isCorrect: false, status: 'answered' }
            ]
        },
        {
            name: "Official Practice Test 2",
            date: "2024-05-15",
            rw: "620", math: "630", total: "1250",
            classAvgRW: "590", classAvgMath: "590", classAvgTotal: "1180",
            pacingAnalysis: [
                { qNum: 1, yourTime: 75, classAvgTime: 60, result: "Correct" },
                { qNum: 2, yourTime: 95, classAvgTime: 80, result: "Incorrect" },
                { qNum: 3, yourTime: 40, classAvgTime: 55, result: "Correct" },
                { qNum: 4, yourTime: 120, classAvgTime: 70, result: "Incorrect" },
                { qNum: 5, yourTime: 65, classAvgTime: 65, result: "Correct" }
            ],
            questionDetails: [
                { text: "If a circle has a radius of 5, what is its area?", yourAnswer: "25π", isCorrect: true, status: 'answered' },
                { text: "Which choice provides the best evidence for the answer?", yourAnswer: "Lines 10-12", isCorrect: true, status: 'answered' },
                { text: "What is the value of sin(45°)?", yourAnswer: "1", isCorrect: false, status: 'answered' },
                { text: "What is the capital of Australia?", yourAnswer: "Sydney", isCorrect: false, status: 'answered' },
                { text: "A car travels 150 miles in 3 hours. Speed?", yourAnswer: "N/A", isCorrect: false, status: 'unanswered' }
            ]
        },
        { name: "Official Practice Test 3", date: "Not Attempted", rw: "-", math: "-", total: "-", classAvgRW: "(N/A)", classAvgMath: "(N/A)", classAvgTotal: "(N/A)"},
    ],
    eocQuizzes: {
        reading: [ { name: "Vocabulary in Context", latestScore: "85% (17/20)", classAvg: "78%", date: "2024-05-01" } ],
        writing: [ { name: "Transitions", latestScore: "90% (9/10)", classAvg: "80%", date: "2024-05-03" } ],
        math: [ { name: "Exponents & Radicals", latestScore: "75% (15/20)", classAvg: "70%", date: "2024-05-05" } ]
    },
    khanAcademy: {
        reading: [{ name: "Khan Academy: Main Idea Practice 1", date: "2024-05-10", score: "8/10 (80%)", pointsPossible: "10", classAvg: "75%" }],
    },
    skills: {
        reading: [
            { category: "Information and Ideas", skills: [
                { name: "Command of Evidence", score: 50, classAvg: 65, attempted: true },
            ]},
            { category: "Craft and Structure", skills: [
                { name: "Words in Context", score: 92, classAvg: 80, attempted: true },
                { name: "Text Structure & Purpose", score: 75, classAvg: 70, attempted: true },
            ]}
        ],
        writing: [
            { category: "Expression of Ideas", skills: [ { name: "Rhetorical Synthesis", score: 75, classAvg: 70, attempted: true } ]},
            { category: "Standard English Conventions", skills: [ { name: "Transitions", score: 48, classAvg: 70, attempted: true }, { name: "Punctuation", score: 0, classAvg: 60, attempted: false} ]}
        ],
        math: [
            { category: "Algebra", skills: [ { name: "Linear Equations", score: 95, classAvg: 85, attempted: true } ]},
            { category: "Advanced Math", skills: [ { name: "Quadratic Equations", score: 45, classAvg: 72, attempted: true } ]}
        ]
    },
    allQuestions: [
        { id: 1, source: "Official Practice Test 2", text: "What is the value of sin(45°)?", skill: "Trigonometry", isCorrect: false, yourAnswer: "1" },
        { id: 2, source: "Official Practice Test 2", text: "What is the capital of Australia?", skill: "General Knowledge", isCorrect: false, yourAnswer: "Sydney" },
        { id: 3, source: "Diagnostic Test", text: "What is the value of 4! (factorial)?", skill: "Advanced Math", isCorrect: false, yourAnswer: "12" },
        { id: 4, source: "Khan: Verb Tense", text: "The committee _______ deliberating for three days.", skill: "Verb Tense", isCorrect: false, yourAnswer: "is" }
    ]
};
const eocChapters = {
    reading: ["Vocabulary in Context", "Making the Leap", "The Big Picture", "Literal Comprehension", "Reading for Function", "Supporting & Undermining", "Graphs & Charts", "Paired Passages"],
    writing: ["Transitions", "Specific Focus", "Sentences & Fragments", "Joining & Separating Sentences", "Non-Essential & Essential Clauses", "Verbs Agreements and Tense", "Pronouns", "Modification", "Parallel Structure"],
    math: ["Exponents & Radicals", "Percent", "Rates", "Ratio & Proportion", "Expressions", "Constructing Models", "Manipulating & Solving Equations", "Systems of Equations", "Inequalities", "Lines", "Functions", "Quadratics", "Angles", "Triangles", "Circles", "Trigonometry", "Probability", "Statistics 1"]
};

let modalDonutChartInstance = null;
let modalLineChartInstance = null;
let scoreTrendChartInstance = null;
let overallSkillChartInstance = null;

document.addEventListener('DOMContentLoaded', function () {
    loadAndDisplayData();
    setupEventListeners();
});

function setupEventListeners() {
    const mainTabs = document.querySelectorAll('.main-tab-button');
    const mainTabContents = document.querySelectorAll('.main-tab-content');
    const hamburgerButton = document.getElementById('hamburgerButton');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavLinks = document.querySelectorAll('#mobileMenu .mobile-nav-link');

    document.getElementById('currentYear').textContent = new Date().getFullYear();

    if (hamburgerButton && mobileMenu) {
        hamburgerButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    function switchTab(tabElement) {
        const targetTabName = tabElement.getAttribute('data-main-tab');

        mainTabs.forEach(t => t.classList.remove('active'));
        mainTabContents.forEach(content => content.classList.add('hidden'));
        mobileNavLinks.forEach(link => link.classList.remove('active'));

        document.querySelector(`.main-tab-button[data-main-tab="${targetTabName}"]`)?.classList.add('active');
        document.querySelector(`.mobile-nav-link[data-main-tab="${targetTabName}"]`)?.classList.add('active');

        const targetContent = document.getElementById(targetTabName + '-content');
        if (targetContent) {
            targetContent.classList.remove('hidden');
        }
        
        if (targetTabName === 'overview') {
            initializeOverviewCharts(currentStudentData);
        }

        const firstSubTab = document.querySelector(`#${targetTabName}-content .sub-tab-button`);
        if (firstSubTab) {
            firstSubTab.click();
        }

        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    }

    mainTabs.forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab));
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab(link);
        });
    });

    document.querySelectorAll('.sub-tab-button').forEach(subTab => {
        subTab.addEventListener('click', () => {
            const parentMainTabContent = subTab.closest('.main-tab-content');
            parentMainTabContent.querySelectorAll('.sub-tab-button').forEach(st => st.classList.remove('active'));
            parentMainTabContent.querySelectorAll('.sub-tab-content-panel').forEach(panel => panel.classList.add('hidden'));
            
            subTab.classList.add('active');
            const targetSubContentId = subTab.getAttribute('data-sub-tab') + '-content';
            document.getElementById(targetSubContentId)?.classList.remove('hidden');
        });
    });
    
    document.querySelector('.main-tab-button[data-main-tab="overview"]')?.click();
}

async function loadAndDisplayData() {
    document.getElementById('studentNameDisplay').textContent = `Welcome, ${currentStudentData.name}!`;
    
    populateOverviewSnapshot(currentStudentData);
    populateImprovementHub(currentStudentData.allQuestions);
    populatePracticeTestsTable(currentStudentData.cbPracticeTests);
    
    ['reading', 'writing', 'math'].forEach(subject => {
        const studentEOCs = currentStudentData.eocQuizzes[subject] || [];
        const allSubjectEOCs = (eocChapters[subject] || []).map(chapterName => {
            const existing = studentEOCs.find(e => e.name === chapterName);
            return existing || { name: chapterName, latestScore: "N/A", classAvg: "N/A", date: "N/A" };
        });
        populateEOCTable(subject, allSubjectEOCs);
        populateKhanSection(subject, currentStudentData.khanAcademy[subject] || []);
        populateCBSkills(subject, currentStudentData.skills[subject] || []);
    });
}

function populateOverviewSnapshot(studentData) {
    populateDynamicStrengthsAndWeaknesses(studentData.skills);

    const kpiContainer = document.getElementById('overview-kpis');
    kpiContainer.innerHTML = `
        <div class="score-card">
            <h3 class="text-md font-medium text-gray-600">Latest Total Score</h3>
            <p class="text-3xl font-bold score-value">${studentData.latestScores.total} <span class="text-lg text-gray-500">/ 1600</span></p>
            <p class="text-sm text-gray-500 mt-1">Class Avg: ${studentData.classAveragesGlobal.total}</p>
        </div>
        <div class="score-card">
            <h3 class="text-md font-medium text-gray-600">Latest R&W Score</h3>
            <p class="text-3xl font-bold score-value">${studentData.latestScores.rw} <span class="text-lg text-gray-500">/ 800</span></p>
            <p class="text-sm text-gray-500 mt-1">Class Avg: ${studentData.classAveragesGlobal.rw}</p>
        </div>
        <div class="score-card">
            <h3 class="text-md font-medium text-gray-600">Latest Math Score</h3>
            <p class="text-3xl font-bold score-value">${studentData.latestScores.math} <span class="text-lg text-gray-500">/ 800</span></p>
            <p class="text-sm text-gray-500 mt-1">Class Avg: ${studentData.classAveragesGlobal.math}</p>
        </div>
        <div class="score-card">
            <h3 class="text-md font-medium text-gray-600">Avg EOC Score</h3>
            <p class="text-3xl font-bold score-value">${studentData.latestScores.avgEocKhan}%</p>
            <p class="text-sm text-gray-500 mt-1">Class Avg: ${studentData.classAveragesGlobal.avgEocKhan}%</p>
        </div>
        <div class="score-card">
            <h3 class="text-md font-medium text-gray-600">Your Target Score</h3>
            <p class="text-3xl font-bold" style="color: #8a3ffc;">${studentData.targetScore}</p>
            <p class="text-sm text-gray-500 mt-1">Goal: +${studentData.targetScore - studentData.latestScores.total} points</p>
        </div>
    `;

    const timeSpentOverviewDiv = document.getElementById('timeSpentOverview');
    if(timeSpentOverviewDiv && studentData.timeSpent) {
        timeSpentOverviewDiv.innerHTML = `
            <p class="text-gray-600">Your Avg: <span class="font-semibold">${studentData.timeSpent.studentAvg} ${studentData.timeSpent.studentUnit}</span></p>
            <p class="text-gray-600">Class Avg: <span class="font-semibold">${studentData.timeSpent.classAvg} ${studentData.timeSpent.classUnit}</span></p>
        `;
    }
}

/**
 * NEW: Dynamically finds the top 3 strengths and weaknesses from all skills data.
 * @param {object} skillsData - The student's skills object from the main data source.
 */
function populateDynamicStrengthsAndWeaknesses(skillsData) {
    const strengthsContainer = document.getElementById('overviewStrengthsContainer');
    const improvementsContainer = document.getElementById('overviewImprovementsContainer');
    if (!strengthsContainer || !improvementsContainer) return;

    // Flatten all attempted skills into a single array
    const allSkills = Object.values(skillsData).flat().flatMap(category => category.skills).filter(skill => skill.attempted);

    // Sort by score for strengths (descending) and weaknesses (ascending)
    allSkills.sort((a, b) => b.score - a.score);
    const strengths = allSkills.slice(0, 3);

    allSkills.sort((a, b) => a.score - b.score);
    const weaknesses = allSkills.slice(0, 3);
    
    // Populate strengths
    strengthsContainer.innerHTML = '';
    if (strengths.length > 0) {
        const strengthList = document.createElement('ul');
        strengthList.className = 'list-disc list-inside space-y-1 text-gray-600';
        strengths.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = `${skill.name} (${skill.score}%)`;
            strengthList.appendChild(li);
        });
        strengthsContainer.appendChild(strengthList);
    } else {
        strengthsContainer.innerHTML = '<p class="text-gray-500">No strength data available.</p>';
    }

    // Populate weaknesses
    improvementsContainer.innerHTML = '';
    if (weaknesses.length > 0) {
        const improvementList = document.createElement('ul');
        improvementList.className = 'list-disc list-inside space-y-1 text-gray-600';
        weaknesses.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = `${skill.name} (${skill.score}%)`;
            improvementList.appendChild(li);
        });
        improvementsContainer.appendChild(improvementList);
    } else {
        improvementsContainer.innerHTML = '<p class="text-gray-500">No improvement data available.</p>';
    }
}

function initializeOverviewCharts(studentData) {
    const primaryChartColor = '#2a5266';
    const secondaryChartColor = '#757575';
    const barChartPrimaryBg = 'rgba(42, 82, 102, 0.8)';
    const barChartSecondaryBg = 'rgba(117, 117, 117, 0.7)';
    const chartOptions = { responsive: true, maintainAspectRatio: true, plugins: { legend: { display: true, position: 'bottom' }}};
    
    const scoreTrendCtx = document.getElementById('scoreTrendChart')?.getContext('2d');
    if (scoreTrendCtx) {
        if (scoreTrendChartInstance) scoreTrendChartInstance.destroy();
        scoreTrendChartInstance = new Chart(scoreTrendCtx, { 
            type: 'line', 
            data: { 
                labels: studentData.scoreTrend.labels, 
                datasets: [
                    { label: 'Your Total Score', data: studentData.scoreTrend.studentScores, borderColor: primaryChartColor, tension: 0.1, fill: false },
                    { label: 'Class Average Total Score', data: studentData.scoreTrend.classAvgScores, borderColor: secondaryChartColor, tension: 0.1, borderDash: [5, 5], fill: false }
                ] 
            }, 
            options: chartOptions 
        });
    }
    
    const overallSkillCtx = document.getElementById('overallSkillChart')?.getContext('2d');
    if (overallSkillCtx) {
        if (overallSkillChartInstance) overallSkillChartInstance.destroy();
        overallSkillChartInstance = new Chart(overallSkillCtx, { 
            type: 'bar', 
            data: { 
                labels: studentData.overallSkillPerformance.labels, 
                datasets: [
                    { label: 'Your Accuracy', data: studentData.overallSkillPerformance.studentAccuracy, backgroundColor: barChartPrimaryBg },
                    { label: 'Class Average Accuracy', data: studentData.overallSkillPerformance.classAvgAccuracy, backgroundColor: barChartSecondaryBg }
                ] 
            }, 
            options: { ...chartOptions, scales: { y: { beginAtZero: true, max: 100 } } } 
        });
    }
}

/**
 * NEW: Populates the "My Improvement Hub" with categorized incorrect questions.
 * @param {Array} allQuestions - The flat list of all questions attempted by the student.
 */
function populateImprovementHub(allQuestions) {
    const container = document.getElementById('improvement-hub-body');
    if (!container) return;
    container.innerHTML = '';

    const incorrectQuestions = allQuestions.filter(q => !q.isCorrect);
    if (incorrectQuestions.length === 0) {
        container.innerHTML = '<p class="text-gray-600 p-4 text-center">Great job! No incorrect questions found to review.</p>';
        return;
    }

    const questionsBySkill = incorrectQuestions.reduce((acc, q) => {
        (acc[q.skill] = acc[q.skill] || []).push(q);
        return acc;
    }, {});

    const fragment = document.createDocumentFragment();
    for (const skill in questionsBySkill) {
        const skillWrapper = document.createElement('div');
        skillWrapper.className = 'mb-4';

        const skillTitle = document.createElement('h4');
        skillTitle.className = 'text-lg font-semibold text-gray-800 mb-2 border-b pb-2';
        skillTitle.textContent = skill;
        skillWrapper.appendChild(skillTitle);
        
        const questionList = document.createElement('div');
        questionsBySkill[skill].forEach(q => {
            const item = document.createElement('a');
            item.href = '#';
            item.className = 'improvement-item';
            item.innerHTML = `
                <p>${q.text}</p>
                <p class="source">Your Answer: <span class="text-poor font-medium">${q.yourAnswer}</span> | From: ${q.source}</p>
            `;
            item.onclick = (e) => {
                e.preventDefault();
                const testData = currentStudentData.cbPracticeTests.find(t => t.name === q.source);
                if (testData) {
                   openModal(`${q.source} Details`, { type: 'cb_test', data: testData });
                } else {
                   alert(`Could not find details for source: ${q.source}`);
                }
            };
            questionList.appendChild(item);
        });
        skillWrapper.appendChild(questionList);
        fragment.appendChild(skillWrapper);
    }
    container.appendChild(fragment);
}


function populatePracticeTestsTable(testsData) {
    const cbTableBody = document.getElementById('cb-practice-tests-table-body');
    if (!cbTableBody) return;
    cbTableBody.innerHTML = '';
    testsData.forEach(test => {
        const row = cbTableBody.insertRow();
        const isAttempted = test.date !== "Not Attempted";
        row.className = isAttempted ? 'clickable-row' : 'opacity-60';
        row.innerHTML = `<td>${test.name}</td><td>${formatDate(test.date)}</td><td>${test.rw}</td><td>${test.math}</td><td>${test.total}</td><td>${test.classAvgRW}</td><td>${test.classAvgMath}</td><td>${test.classAvgTotal}</td>`;
        if(isAttempted){
            row.onclick = () => openModal(`${test.name} Details`, { type: 'cb_test', data: test });
        }
    });
}

function populateEOCTable(sectionKey, eocQuizData) {
    const tbody = document.getElementById(`${sectionKey}-eoc-tbody`);
    const thead = document.getElementById(`${sectionKey}-eoc-thead`);
    if (!tbody || !thead) return;
    
    thead.innerHTML = `<tr><th>Practice Name</th><th>Latest Score</th><th>Date Attempted</th><th>Class Avg Score</th></tr>`;
    tbody.innerHTML = ''; 

    (eocQuizData || []).forEach(item => {
        const row = tbody.insertRow();
        const isAttempted = item.date !== "N/A";
        row.className = isAttempted ? 'clickable-row' : 'opacity-60';
        row.innerHTML = `<td>${item.name}</td><td>${item.latestScore}</td><td>${formatDate(item.date)}</td><td>${item.classAvg}</td>`;
        if(isAttempted){
            row.onclick = () => openModal(`EOC Practice: ${item.name}`, { type: 'eoc_quiz', data: item });
        }
    });
     if ((eocQuizData || []).length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="text-center text-gray-500 py-3">No EOC Practice data available for ${sectionKey}.</td></tr>`;
    }
}

function populateKhanSection(sectionKey, khanItems) {
    const container = document.getElementById(`${sectionKey}-khan-data`);
    if (!container) return;
    container.innerHTML = ''; 

    if (khanItems.length > 0) {
        let tableHTML = `<table class="min-w-full table"><thead><tr><th>Assignment Name</th><th>Date</th><th>Your Score</th><th>Points Possible</th><th>Class Avg</th></tr></thead><tbody>`;
        khanItems.forEach(item => {
            const itemDataString = JSON.stringify({type: 'khan', data: item}).replace(/"/g, "'");
            tableHTML += `<tr class="clickable-row" onclick="openModal(&quot;Khan Academy Practice: ${item.name}&quot;, ${itemDataString})">
                <td>${item.name}</td><td>${formatDate(item.date)}</td><td>${item.score}</td><td>${item.pointsPossible}</td><td>${item.classAvg}</td>
            </tr>`;
        });
        tableHTML += `</tbody></table>`;
        container.innerHTML = tableHTML;
    } else {
        container.innerHTML = `<p class="text-gray-600 p-3">No Khan Academy Practice data available for ${currentStudentData.name} in ${sectionKey}.</p>`;
    }
}

function getPerformanceClass(score, attempted = true) {
    if (!attempted) return 'performance-na';
    if (score >= 85) return 'performance-good';
    if (score >= 70) return 'performance-average';
    return 'performance-poor';
}

function populateCBSkills(sectionKey, skillsCategoriesData) {
    const container = document.getElementById(`${sectionKey}-cb-skills-data`);
    if (!container) return;
    container.innerHTML = ''; 

    if (!skillsCategoriesData || skillsCategoriesData.length === 0) {
        container.innerHTML = `<p class="text-gray-500 p-3">No Skill data available for ${sectionKey}.</p>`;
        return;
    }

    skillsCategoriesData.forEach(category => {
        const categoryWrapper = document.createElement('div');
        categoryWrapper.className = 'mb-4';
        
        const categoryTitle = document.createElement('h4');
        categoryTitle.className = 'text-md font-semibold text-gray-700 mb-2 pt-2 border-t border-gray-200';
        categoryTitle.textContent = category.category;
        categoryWrapper.appendChild(categoryTitle);

        if (category.skills && category.skills.length > 0) {
            category.skills.forEach(skill => {
                const skillDiv = document.createElement('div');
                skillDiv.className = 'p-3 bg-gray-50 rounded-md border border-gray-200 mb-2';
                const score = skill.attempted ? skill.score : 0;
                const performanceClass = getPerformanceClass(score, skill.attempted);
                let displayScore = skill.attempted ? `${skill.score}%` : "N/A";
                let barClass = performanceClass;
                let barWidth = skill.attempted ? score : 0;
                if (!skill.attempted) { barClass = 'bg-gray-300'; }

                skillDiv.innerHTML = `
                    <div class="flex justify-between items-center mb-1">
                        <span class="text-sm font-medium text-gray-800">${skill.name}</span>
                        <span class="text-xs ${performanceClass === 'performance-na' ? 'text-gray-500' : 'font-semibold ' + performanceClass.replace('performance-','text-')}">${displayScore}</span>
                    </div>
                    <div class="progress-bar-container"><div class="progress-bar ${barClass}" style="width: ${barWidth}%"></div></div>
                    <p class="text-xs text-gray-500 mt-1">Class Avg: ${skill.classAvg}%</p>`;
                categoryWrapper.appendChild(skillDiv);
            });
        }
        container.appendChild(categoryWrapper);
    });
}

const modal = document.getElementById('detailModal');

/**
 * REFINED: The modal is now fully dynamic, showing question details, pacing, or other content.
 * @param {string} title - The title for the modal header.
 * @param {object} contentDetails - An object containing the type and data for the modal.
 */
function openModal(title, contentDetails) {
    const modalHeader = modal.querySelector('#modalTitle');
    if(modalHeader) modalHeader.textContent = title;
    
    const initialContentContainer = document.getElementById('modal-initial-content');
    const pacingContainer = document.getElementById('modal-pacing-analysis-container');
    const questionDetailsContainer = document.getElementById('modalQuestionDetails');

    // Hide all optional sections by default, show the main one
    pacingContainer.classList.add('hidden');
    initialContentContainer.classList.remove('hidden');

    // Destroy previous charts
    if(modalDonutChartInstance) modalDonutChartInstance.destroy();
    if(modalLineChartInstance) modalLineChartInstance.destroy();

    // --- Dynamic Content Population ---

    // 1. Pacing Analysis
    if (contentDetails.type === 'cb_test' && contentDetails.data.pacingAnalysis) {
        pacingContainer.classList.remove('hidden');
        const pacingTableBody = document.getElementById('pacing-analysis-table-body');
        pacingTableBody.innerHTML = ''; // Clear previous
        contentDetails.data.pacingAnalysis.forEach(p => {
            const row = pacingTableBody.insertRow();
            let pacingStatus, pacingClass;
            const diff = p.yourTime - p.classAvgTime;
            if (diff > 15) { pacingStatus = 'Slower'; pacingClass = 'pacing-slower'; } 
            else if (diff < -15) { pacingStatus = 'Faster'; pacingClass = 'pacing-faster'; } 
            else { pacingStatus = 'On Pace'; pacingClass = 'pacing-on-pace'; }
            
            row.innerHTML = `
                <td>${p.qNum}</td><td>${p.yourTime}s</td><td>${p.classAvgTime}s</td>
                <td><span class="pacing-badge ${pacingClass}">${pacingStatus}</span></td>
                <td class="${p.result === 'Correct' ? 'text-good' : 'text-poor'} font-semibold">${p.result}</td>`;
        });
    }

    // 2. Question-by-Question Details & Donut Chart
    const questions = contentDetails.data.questionDetails || [];
    if (questions.length > 0) {
        questionDetailsContainer.innerHTML = ''; // Clear previous
        questions.forEach((q, i) => {
            let statusText, statusClass;
            if (q.status === 'unanswered') { statusText = 'Unanswered'; statusClass = 'bg-yellow-50 border-yellow-200 text-yellow-700'; } 
            else if (q.isCorrect) { statusText = 'Correct'; statusClass = 'bg-green-50 border-green-200 text-green-700'; } 
            else { statusText = 'Incorrect'; statusClass = 'bg-red-50 border-red-200 text-red-700'; }

            questionDetailsContainer.innerHTML += `
                <div class="p-2 border rounded-md ${statusClass}">
                    <p class="font-medium text-gray-700">Q${i + 1}: ${q.text}</p>
                    <p>Your Answer: <span class="font-semibold ${q.status === 'unanswered' ? '' : (q.isCorrect ? 'text-good' : 'text-poor')}">${q.yourAnswer}</span> (${statusText})</p>
                </div>`;
        });

        // Generate Donut Chart from this data
        const correct = questions.filter(q => q.status === 'answered' && q.isCorrect).length;
        const incorrect = questions.filter(q => q.status === 'answered' && !q.isCorrect).length;
        const unanswered = questions.filter(q => q.status === 'unanswered').length;
        const donutCtx = document.getElementById('modalDonutChart').getContext('2d');
        modalDonutChartInstance = new Chart(donutCtx, {type:'doughnut',data:{labels:['Correct','Incorrect','Unanswered'],datasets:[{data:[correct, incorrect, unanswered],backgroundColor:['#4caf50','#f44336','#9e9e9e'],hoverOffset:4}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom'}},cutout:'50%'}});
    
    } else {
        questionDetailsContainer.innerHTML = '<p class="text-center text-gray-500 py-4">No detailed question data available for this item.</p>';
        // Show a placeholder donut chart if no specific data
        const donutCtx = document.getElementById('modalDonutChart').getContext('2d');
        modalDonutChartInstance = new Chart(donutCtx, {type:'doughnut',data:{labels:['N/A'],datasets:[{data:[1],backgroundColor:['#e0e0e0']}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},cutout:'50%'}});
    }
    
    // 3. Score Trend (Sample data, can be customized)
    const lineCtx = document.getElementById('modalLineChart').getContext('2d');
    modalLineChartInstance = new Chart(lineCtx,{type:'line',data:{labels:['Wk1','Wk2','Wk3','Wk4','Wk5'],datasets:[{label:'You',data:Array.from({length:5},()=>60+Math.random()*30),borderColor:'#2a5266'},{label:'Class',data:Array.from({length:5},()=>55+Math.random()*25),borderColor:'#757575',borderDash:[5,5]}]},options:{responsive:true,maintainAspectRatio:false,scales:{y:{beginAtZero:true,max:100}}}});

    if(modal) modal.style.display="block";
}

function closeModal() { 
    if(modal) modal.style.display = "none"; 
    if (modalDonutChartInstance) modalDonutChartInstance.destroy(); 
    if (modalLineChartInstance) modalLineChartInstance.destroy(); 
}

window.onclick = function(event) { 
    if (event.target == modal) closeModal(); 
}