

```javascript
// script.js


// --- DUMMY DATA FOR PROTOTYPING ---
// This new data structure supports the "Improvement Hub" and "Pacing Analysis"
let currentStudentData = {
    name: "Alex Johnson",
    email: "alex.j@example.com",
    targetScore: 1400,
    latestScores: { total: 1250, rw: 620, math: 630, avgEocKhan: 78 },
    classAveragesGlobal: { total: 1180, rw: 590, math: 590, avgEocKhan: 75, avgTimePerQuestion: 75 },
    scoreTrend: {
        labels: ['Diag', 'PT 1', 'PT 2', 'PT 3'],
        scores: [1050, 1120, 1190, 1250]
    },
    overallSkillPerformance: {
        labels: ['Reading', 'Writing', 'Math'],
        studentAccuracy: [75, 82, 71],
        classAvgAccuracy: [72, 78, 74]
    },
    // Dummy data for a few CB tests
    cbPracticeTests: [
        { id: 'cbpt1', name: "Official Practice Test 1", date: "2024-04-15", rw: 580, math: 540, total: 1120, classAvg: 1100 },
        { id: 'cbpt2', name: "Official Practice Test 2", date: "2024-05-01", rw: 600, math: 590, total: 1190, classAvg: 1150 },
        { id: 'cbpt3', name: "Official Practice Test 3", date: "2024-05-20", rw: 620, math: 630, total: 1250, classAvg: 1180 },
    ],
    // Detailed question data, including incorrect answers for the "Improvement Hub"
    questionDetails: [
        // Test 1 Mistakes
        { testId: 'cbpt1', qNumber: 3, subject: 'Math', skill: 'Algebra', correct: false, studentTime: 95, classAvgTime: 70, questionText: "Solve for x: 2(x + 5) = 20" },
        { testId: 'cbpt1', qNumber: 8, subject: 'Reading', skill: 'Words in Context', correct: false, studentTime: 80, classAvgTime: 65, questionText: "What is the meaning of 'ubiquitous' in line 24?" },
        // Test 2 Mistakes
        { testId: 'cbpt2', qNumber: 5, subject: 'Math', skill: 'Algebra', correct: false, studentTime: 110, classAvgTime: 80, questionText: "If f(x) = 3x - 7, what is the value of f(4)?" },
        { testId: 'cbpt2', qNumber: 12, subject: 'Writing', skill: 'Transitions', correct: false, studentTime: 55, classAvgTime: 45, questionText: "Which transition best connects the two sentences?" },
        { testId: 'cbpt2', qNumber: 15, subject: 'Math', skill: 'Geometry', correct: false, studentTime: 125, classAvgTime: 90, questionText: "What is the area of a circle with a radius of 5?" },
        // Test 3 Correct Answers (for pacing data)
        { testId: 'cbpt3', qNumber: 1, subject: 'Math', skill: 'Algebra', correct: true, studentTime: 60, classAvgTime: 65, questionText: "Sample correct question 1..." },
        { testId: 'cbpt3', qNumber: 2, subject: 'Math', skill: 'Geometry', correct: true, studentTime: 90, classAvgTime: 85, questionText: "Sample correct question 2..." },
        { testId: 'cbpt3', qNumber: 3, subject: 'Reading', skill: 'Words in Context', correct: true, studentTime: 50, classAvgTime: 60, questionText: "Sample correct question 3..." },
    ],
    // Dummy skill scores for Strengths/Weaknesses
    skillScores: [
        { skill: 'Algebra', score: 65, classAvg: 75 },
        { skill: 'Geometry', score: 72, classAvg: 70 },
        { skill: 'Trigonometry', score: 88, classAvg: 80 },
        { skill: 'Words in Context', score: 92, classAvg: 85 },
        { skill: 'Transitions', score: 75, classAvg: 80 },
        { skill: 'Command of Evidence', score: 95, classAvg: 88 },
    ]
    // Other data like EOC/Khan would go here...
};


// --- DOMContentLoaded ---
document.addEventListener('DOMContentLoaded', () => {
    // Check for student email in localStorage
    const savedEmail = localStorage.getItem('studentEmail');
    if (savedEmail) {
        // In a real app, you'd fetch data for this email. Here, we just load the dummy data.
        loadAndDisplayData(savedEmail);
    } else {
        // Show the login modal if no email is saved
        document.getElementById('loginModal').style.display = 'flex';
    }


    // Event listeners
    document.getElementById('loginButton').addEventListener('click', handleLogin);
    document.getElementById('hamburgerButton').addEventListener('click', toggleMobileMenu);
   
    document.querySelectorAll('.main-tab-button, .mobile-nav-link').forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            switchMainTab(tab.getAttribute('data-main-tab'));
            if(document.getElementById('main-nav-mobile').classList.contains('hidden') === false) {
                 toggleMobileMenu();
            }
        });
    });
});


function handleLogin() {
    const emailInput = document.getElementById('studentEmailInput');
    const studentEmail = emailInput.value.trim();
    if (studentEmail && studentEmail.includes('@')) { // Simple validation
        localStorage.setItem('studentEmail', studentEmail);
        document.getElementById('loginModal').style.display = 'none';
        loadAndDisplayData(studentEmail);
    } else {
        alert('Please enter a valid email address.');
    }
}


function loadAndDisplayData(studentEmail) {
    // In a real app, this function would use PapaParse to fetch CSVs and then filter
    // for the studentEmail. For this prototype, we use the `currentStudentData` object.
   
    populateOverview(currentStudentData);
    populateImprovementHub(currentStudentData); // NEW
    populateCbPracticeTests(currentStudentData);
    // Other population functions would go here...


    document.getElementById('studentNameDisplay').textContent = `Welcome, ${currentStudentData.name}!`;
    switchMainTab('overview'); // Set the initial tab
}


function switchMainTab(tabName) {
    document.querySelectorAll('.main-tab-content').forEach(content => content.classList.add('hidden'));
    document.querySelectorAll('.main-tab-button, .mobile-nav-link').forEach(tab => tab.classList.remove('active'));


    document.getElementById(`${tabName}-content`).classList.remove('hidden');
    document.querySelectorAll(`[data-main-tab="${tabName}"]`).forEach(t => t.classList.add('active'));
}


function toggleMobileMenu() {
    document.getElementById('main-nav-mobile').classList.toggle('hidden');
}


// --- NEW: Populate "My Improvement Hub" ---
function populateImprovementHub(data) {
    const mistakeContainer = document.getElementById('mistakeContainer');
    mistakeContainer.innerHTML = '';


    const incorrectQuestions = data.questionDetails.filter(q => !q.correct);


    // Group mistakes by skill
    const mistakesBySkill = incorrectQuestions.reduce((acc, q) => {
        if (!acc[q.skill]) {
            acc[q.skill] = [];
        }
        acc[q.skill].push(q);
        return acc;
    }, {});


    if (Object.keys(mistakesBySkill).length === 0) {
        mistakeContainer.innerHTML = `<div class="themed-card"><div class="themed-card-body text-center"><p class="text-lg font-semibold text-green-600">No mistakes found!</p><p class="text-gray-600">Great job on your recent tests.</p></div></div>`;
        return;
    }


    for (const skill in mistakesBySkill) {
        const skillCard = document.createElement('div');
        skillCard.className = 'themed-card';
       
        let questionsHtml = mistakesBySkill[skill].map(q => `
            <div class="mistake-item">
                <p class="font-semibold text-gray-800">${q.questionText}</p>
                <p class="text-xs text-gray-500 mt-1">From: ${data.cbPracticeTests.find(t => t.id === q.testId)?.name || 'Unknown Test'}</p>
            </div>
        `).join('');


        skillCard.innerHTML = `
            <div class="themed-card-title-strip">${skill}</div>
            <div class="themed-card-body space-y-3">
                ${questionsHtml}
            </div>
        `;
        mistakeContainer.appendChild(skillCard);
    }
}


// --- Populate Overview Tab (with NEW Strengths/Weaknesses) ---
function populateOverview(data) {
    document.getElementById('studentScoreCards').innerHTML = `
        <div class="themed-card p-0"><div class="themed-card-title-strip">Total Score</div><div class="themed-card-body text-center py-2"><p class="text-3xl font-bold sathub-accent-text">${data.latestScores.total}</p><p class="text-xs text-gray-500 mt-1">Class Avg: ${data.classAveragesGlobal.total}</p></div></div>
        <div class="themed-card p-0"><div class="themed-card-title-strip">R&W Score</div><div class="themed-card-body text-center py-2"><p class="text-3xl font-bold sathub-accent-text">${data.latestScores.rw}</p><p class="text-xs text-gray-500 mt-1">Class Avg: ${data.classAveragesGlobal.rw}</p></div></div>
        <div class="themed-card p-0"><div class="themed-card-title-strip">Math Score</div><div class="themed-card-body text-center py-2"><p class="text-3xl font-bold sathub-accent-text">${data.latestScores.math}</p><p class="text-xs text-gray-500 mt-1">Class Avg: ${data.classAveragesGlobal.math}</p></div></div>
        <div class="themed-card p-0"><div class="themed-card-title-strip">Avg EOC Score</div><div class="themed-card-body text-center py-2"><p class="text-3xl font-bold sathub-accent-text">${data.latestScores.avgEocKhan}%</p><p class="text-xs text-gray-500 mt-1">Class Avg: ${data.classAveragesGlobal.avgEocKhan}%</p></div></div>
        <div class="themed-card p-0"><div class="themed-card-title-strip">Target Score</div><div class="themed-card-body text-center py-2"><p class="text-3xl font-bold text-purple-600">${data.targetScore}</p><p class="text-xs text-gray-500 mt-1">Goal: ${data.targetScore - data.latestScores.total > 0 ? '+':''}${data.targetScore - data.latestScores.total} pts</p></div></div>`;


    // Populate Strengths and Weaknesses
    const strengthsList = document.getElementById('strengthsList');
    const weaknessesList = document.getElementById('weaknessesList');
    strengthsList.innerHTML = '';
    weaknessesList.innerHTML = '';
   
    const sortedSkills = [...data.skillScores].sort((a, b) => b.score - a.score);
    sortedSkills.slice(0, 3).forEach(skill => {
        strengthsList.innerHTML += `<li class="text-gray-700">${skill.skill}: <span class="font-bold text-good">${skill.score}%</span> (Class Avg: ${skill.classAvg}%)</li>`;
    });
    sortedSkills.slice(-3).reverse().forEach(skill => {
        weaknessesList.innerHTML += `<li class="text-gray-700">${skill.skill}: <span class="font-bold text-poor">${skill.score}%</span> (Class Avg: ${skill.classAvg}%)</li>`;
    });


    // Charts
    new Chart(document.getElementById('studentScoreTrendChart'), { type: 'line', data: { labels: data.scoreTrend.labels, datasets: [{ label: 'Total Score', data: data.scoreTrend.scores, borderColor: '#2a5266', tension: 0.1 }] } });
    new Chart(document.getElementById('studentOverallSkillChart'), { type: 'bar', data: { labels: data.overallSkillPerformance.labels, datasets: [{ label: 'Your Accuracy', data: data.overallSkillPerformance.studentAccuracy, backgroundColor: '#2a5266' }, { label: 'Class Average', data: data.overallSkillPerformance.classAvgAccuracy, backgroundColor: '#c0c0c0' }] }, options: { scales: { y: { beginAtZero: true, max: 100 } } } });
}


function populateCbPracticeTests(data) {
    const tbody = document.getElementById('student-cb-tests-tbody');
    tbody.innerHTML = '';
    data.cbPracticeTests.forEach(test => {
        const row = tbody.insertRow();
        row.className = 'clickable-row';
        row.innerHTML = `<td>${test.name}</td><td>${test.date}</td><td>${test.rw}</td><td>${test.math}</td><td>${test.total}</td><td>${test.classAvg}</td>`;
        row.onclick = () => openModalForTest(test);
    });
}


function openModalForTest(test) {
    document.getElementById('modalTitle').textContent = `Details for ${test.name}`;
   
    // Hide original content and show pacing content
    document.getElementById('modalQuestionAnalysis').style.display = 'none';
    const pacingContainer = document.getElementById('modalPacingAnalysis');
    pacingContainer.style.display = 'block';


    const pacingTbody = document.getElementById('pacingAnalysisTbody');
    pacingTbody.innerHTML = '';


    const testQuestions = currentStudentData.questionDetails.filter(q => q.testId === test.id);
    if(testQuestions.length === 0) {
        pacingTbody.innerHTML = '<tr><td colspan="4" class="p-4 text-center text-gray-500">No detailed pacing data available for this test.</td></tr>';
    } else {
        testQuestions.forEach(q => {
            let pacingText, pacingClass;
            const diff = q.studentTime - q.classAvgTime;
            if (diff > 15) {
                pacingText = 'Slower';
                pacingClass = 'text-poor';
            } else if (diff < -15) {
                pacingText = 'Faster';
                pacingClass = 'text-good';
            } else {
                pacingText = 'On Pace';
                pacingClass = 'text-on-pace';
            }


            pacingTbody.innerHTML += `
                <tr class="border-b border-gray-200">
                    <td class="p-2">${q.qNumber}</td>
                    <td class="p-2">${q.studentTime}s</td>
                    <td class="p-2">${q.classAvgTime}s</td>
                    <td class="p-2 font-semibold ${pacingClass}">${pacingText}</td>
                </tr>
            `;
        });
    }


    document.getElementById('detailModal').style.display = 'flex';
}


function closeModal() {
    document.getElementById('detailModal').style.display = "none";
}


window.onclick = function(event) {
    if (event.target == document.getElementById('detailModal')) {
        closeModal();
    }
}


