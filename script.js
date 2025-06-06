document.addEventListener('DOMContentLoaded', function () {
    // --- DATA STORE ---
    const studentData = {
        name: "Alex Johnson",
        targetScore: 1400,
        latestScores: { total: 1250, rw: 620, math: 630 },
        scoreTrend: { labels: ['Diag', 'Test 1', 'Test 2'], studentScores: [1130, 1220, 1250], classAvgScores: [1050, 1150, 1180] },
        overallSkillPerformance: { labels: ['Reading', 'Writing', 'Math'], studentAccuracy: [78, 82, 75], classAvgAccuracy: [75, 79, 72] },
        allQuestions: [
            { id: 1, source: "Official Practice Test 2", qNum: 1, text: "If a circle has a radius of 5, what is its area?", skill: "Geometry", subject: 'math', isCorrect: false, explanation: "The formula for the area of a circle is πr². With a radius (r) of 5, the area is π * 5² = 25π.", classCorrectPercent: 72, yourTime: 95, classAvgTime: 70 },
            { id: 2, source: "Official Practice Test 2", qNum: 2, text: "Which choice provides the best evidence for the answer to the previous question?", skill: "Command of Evidence", subject: 'reading', isCorrect: false, explanation: "Lines 25-28 directly state the main finding...", classCorrectPercent: 65, yourTime: 110, classAvgTime: 80 },
            { id: 3, source: "Official Practice Test 2", qNum: 3, text: "What is the meaning of 'ubiquitous' in line 24?", skill: "Words in Context", subject: 'reading', isCorrect: true, explanation: "The context suggests the phenomenon was widespread...", classCorrectPercent: 88, yourTime: 45, classAvgTime: 50 },
            { id: 4, source: "Khan: Verb Tense", qNum: 1, text: "The committee _______ deliberating for three days before it reached a decision.", skill: "Transitions", subject: 'writing', isCorrect: false, explanation: "'for three days' indicates a duration...", classCorrectPercent: 78, yourTime: 35, classAvgTime: 30 },
        ],
        cbPracticeTests: [
             { name: "Diagnostic Test", date: "2024-03-01", rw: "550", math: "580", total: "1130", questionIds: []},
             { name: "Official Practice Test 2", date: "2024-05-15", rw: "620", math: "630", total: "1250", questionIds: [1, 2, 3] },
             { name: "Official Practice Test 3", date: "Not Attempted", rw: "-", math: "-", total: "-", questionIds: []},
        ],
        eocQuizzes: {
            reading: [ { name: "Vocabulary in Context", latestScore: "85% (17/20)", date: "2024-05-01" } ],
            writing: [ { name: "Transitions", latestScore: "90% (9/10)", date: "2024-05-03" } ],
            math: [ { name: "Exponents & Radicals", latestScore: "75% (15/20)", date: "2024-05-05" } ]
        },
        khanAcademy: {
            reading: [{ name: "Main Idea Practice 1", score: "8/10", date: "2024-05-10" }],
            writing: [{ name: "Verb Tense Advanced", score: "12/15", date: "2024-05-11" }],
            math: []
        },
        skills: {
            reading: [ { name: "Words in Context", score: 92, classAvg: 80 }, { name: "Command of Evidence", score: 60, classAvg: 65 } ],
            writing: [ { name: "Boundaries", score: 65, classAvg: 70 }, { name: "Transitions", score: 75, classAvg: 72 } ],
            math: [ { name: "Geometry", score: 90, classAvg: 85 }, { name: "Advanced Math", score: 65, classAvg: 72 } ]
        }
    };


    let modalDonutChartInstance, modalLineChartInstance, questionDonutChartInstance, scoreTrendChartInstance, overallSkillChartInstance;


    function init() {
        document.getElementById('currentYear').textContent = new Date().getFullYear();
        document.getElementById('studentNameDisplay').textContent = `Welcome, ${studentData.name}!`;
        setupEventListeners();
        const overviewTab = document.querySelector('.main-tab-button[data-main-tab="overview"]');
        switchTab(overviewTab);
    }


    function setupEventListeners() {
        document.querySelectorAll('.main-tab-button, .mobile-nav-link').forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                switchTab(tab);
            });
        });
        document.querySelectorAll('.sub-tab-button').forEach(subTab => {
            subTab.addEventListener('click', () => switchSubTab(subTab));
        });
        document.getElementById('hamburgerButton').addEventListener('click', () => {
            document.getElementById('mobileMenu').classList.toggle('hidden');
        });
    }


    function switchTab(tabElement) {
        const targetTabName = tabElement.getAttribute('data-main-tab');
        document.querySelectorAll('.main-tab-button').forEach(t => t.classList.remove('active'));
        document.querySelector(`.main-tab-button[data-main-tab="${targetTabName}"]`)?.classList.add('active');
        document.querySelectorAll('.mobile-nav-link').forEach(link => link.classList.remove('active'));
        document.querySelector(`.mobile-nav-link[data-main-tab="${targetTabName}"]`)?.classList.add('active');
        document.getElementById('mobileMenu').classList.add('hidden');
        document.querySelectorAll('.main-tab-content').forEach(content => content.classList.add('hidden'));
        document.getElementById(targetTabName + '-content').classList.remove('hidden');


        switch(targetTabName) {
            case 'overview': populateOverviewTab(); break;
            case 'cb-practice-tests': populatePracticeTestsTable(studentData.cbPracticeTests); break;
            case 'reading': case 'writing': case 'math': populateSubjectTab(targetTabName); break;
        }
    }


    function switchSubTab(subTabElement) {
        const parentPanel = subTabElement.closest('.main-tab-content');
        parentPanel.querySelectorAll('.sub-tab-button').forEach(st => st.classList.remove('active'));
        subTabElement.classList.add('active');
        parentPanel.querySelectorAll('.sub-tab-content-panel').forEach(panel => panel.classList.add('hidden'));
        document.getElementById(subTabElement.getAttribute('data-sub-tab') + '-content')?.classList.remove('hidden');
    }


    function populateOverviewTab() {
        const snapshotContainer = document.getElementById('overview-snapshot-cards');
        snapshotContainer.innerHTML = `
            <div class="score-card"><h3 class="text-sm font-medium text-gray-600">Latest Total</h3><p class="text-3xl font-bold text-[#2a5266]">${studentData.latestScores.total}</p></div>
            <div class="score-card"><h3 class="text-sm font-medium text-gray-600">Latest R&W</h3><p class="text-3xl font-bold text-[#2a5266]">${studentData.latestScores.rw}</p></div>
            <div class="score-card"><h3 class="text-sm font-medium text-gray-600">Latest Math</h3><p class="text-3xl font-bold text-[#2a5266]">${studentData.latestScores.math}</p></div>
            <div class="score-card"><h3 class="text-sm font-medium text-gray-600">Target Score</h3><p class="text-3xl font-bold" style="color: #8a3ffc;">${studentData.targetScore}</p></div>
            <div class="score-card"><h3 class="text-sm font-medium text-gray-600">Avg EOC Score</h3><p class="text-3xl font-bold text-[#2a5266]">83%</p></div>`; // Placeholder


        if (scoreTrendChartInstance) scoreTrendChartInstance.destroy();
        scoreTrendChartInstance = new Chart(document.getElementById('scoreTrendChart').getContext('2d'), {type:'line', data:{labels:studentData.scoreTrend.labels, datasets:[{label:'Your Score',data:studentData.scoreTrend.studentScores, borderColor:'#2a5266'},{label:'Class Avg',data:studentData.scoreTrend.classAvgScores, borderColor:'#9ca3af', borderDash:[5,5]}]}});
       
        if (overallSkillChartInstance) overallSkillChartInstance.destroy();
        overallSkillChartInstance = new Chart(document.getElementById('overallSkillChart').getContext('2d'), {type:'bar', data:{labels:studentData.overallSkillPerformance.labels, datasets:[{label:'Your Accuracy',data:studentData.overallSkillPerformance.studentAccuracy, backgroundColor:'#2a5266'},{label:'Class Avg',data:studentData.overallSkillPerformance.classAvgAccuracy, backgroundColor:'#9ca3af'}]}});
       
        populateImprovementHub(studentData.allQuestions);
    }


    function populateImprovementHub(allQuestions) {
        const container = document.getElementById('improvement-hub-content');
        const incorrectQs = allQuestions.filter(q => !q.isCorrect);
        if (incorrectQs.length === 0) { container.innerHTML = '<p>No incorrect questions found!</p>'; return; }
        const qsBySkill = incorrectQs.reduce((acc, q) => { (acc[q.skill] = acc[q.skill] || []).push(q); return acc; }, {});
        container.innerHTML = Object.entries(qsBySkill).map(([skill, questions]) => `
            <div class="mb-4">
                <h4 class="text-md font-semibold text-gray-800 mb-2 border-b pb-1">${skill}</h4>
                ${questions.map(q => `<a href="#" class="improvement-item" onclick="event.preventDefault(); openModal('Question Analysis', { type: 'question_deep_dive', questionId: ${q.id} })">
                        <p>${q.text}</p><p class="source">From: ${q.source}</p></a>`).join('')}
            </div>`).join('');
    }
   
    function populatePracticeTestsTable(tests) {
        const tableBody = document.getElementById('cb-practice-tests-table-body');
        tableBody.innerHTML = tests.map(test => {
            const isAttempted = test.date !== "Not Attempted";
            return `<tr class="${isAttempted ? 'clickable-row' : 'opacity-60'}" ${isAttempted ? `onclick="openModal('${test.name} Details', { type: 'cb_test', testName: '${test.name}' })"` : ''}>
                <td>${test.name}</td><td>${test.date}</td><td>${test.rw}</td><td>${test.math}</td><td>${test.total}</td></tr>`;
        }).join('');
    }


    function populateSubjectTab(subject) {
        const eocTbody = document.getElementById(`${subject}-eoc-tbody`);
        eocTbody.innerHTML = (studentData.eocQuizzes[subject] || []).map(item => `<tr><td>${item.name}</td><td>${item.latestScore}</td><td>${item.date}</td></tr>`).join('') || `<tr><td colspan="3" class="text-center">No EOC data</td></tr>`;
       
        const khanContainer = document.getElementById(`${subject}-khan-data`);
        khanContainer.innerHTML = (studentData.khanAcademy[subject] || []).map(item => `<p class="p-2 border-b">${item.name}: ${item.score} (${item.date})</p>`).join('') || '<p class="p-2">No Khan Academy data</p>';
       
        const skillsContainer = document.getElementById(`${subject}-skills-data`);
        skillsContainer.innerHTML = (studentData.skills[subject] || []).map(skill => {
            const perfClass = skill.score >= 85 ? 'performance-good' : skill.score >= 70 ? 'performance-average' : 'performance-poor';
            return `<div class="p-2"><div class="flex justify-between items-center mb-1"><span class="font-medium">${skill.name}</span><span>${skill.score}%</span></div>
                <div class="progress-bar-container"><div class="progress-bar ${perfClass}" style="width: ${skill.score}%"></div></div>
                <p class="text-xs text-gray-500 mt-1">Class Avg: ${skill.classAvg}%</p></div>`;
        }).join('') || '<p>No skill data</p>';
       
        const firstSubTab = document.querySelector(`#${subject}-content .sub-tab-button`);
        if(firstSubTab) switchSubTab(firstSubTab);
    }


    window.openModal = function(title, details) {
        const modalSizer = document.getElementById('modal-content-sizer');
        document.getElementById('modalTitle').textContent = title;
        const testView = document.getElementById('modal-test-view');
        const questionView = document.getElementById('modal-question-view');
        testView.classList.add('hidden');
        questionView.classList.add('hidden');
        modalSizer.classList.remove('modal-large');


        if (details.type === 'cb_test') {
            modalSizer.classList.add('modal-large');
            testView.classList.remove('hidden');
            const test = studentData.cbPracticeTests.find(t => t.name === details.testName);
            const testQuestions = studentData.allQuestions.filter(q => test.questionIds.includes(q.id));
            renderTestView(testQuestions);
        } else if (details.type === 'question_deep_dive') {
            questionView.classList.remove('hidden');
            const question = studentData.allQuestions.find(q => q.id === details.questionId);
            renderQuestionView(question);
        }
        document.getElementById('detailModal').style.display = 'block';
    };


    function renderTestView(questions) {
        const listContainer = document.getElementById('modal-question-list');
        listContainer.innerHTML = questions.map(q => `
            <div class="question-list-item" onclick="this.querySelector('.explanation').style.display = this.querySelector('.explanation').style.display === 'block' ? 'none' : 'block'">
                <div class="flex justify-between items-center"><p><strong>Q${q.qNum}:</strong> ${q.text.substring(0, 70)}...</p>
                    <span class="result-icon ${q.isCorrect ? 'text-good' : 'text-poor'}">${q.isCorrect ? '✔' : '✖'}</span></div>
                <div class="explanation"><p><strong>Explanation:</strong> ${q.explanation}</p></div></div>`).join('');
       
        const pacingBody = document.getElementById('pacing-analysis-table-body');
        pacingBody.innerHTML = questions.map(p => {
            const diff = p.yourTime - p.classAvgTime;
            const s = (diff > 15) ? {t: 'Slower', c: 'pacing-slower'} : (diff < -15) ? {t: 'Faster', c: 'pacing-faster'} : {t: 'On Pace', c: 'pacing-on-pace'};
            return `<tr><td>${p.qNum}</td><td>${p.yourTime}s</td><td>${p.classAvgTime}s</td><td><span class="pacing-badge ${s.c}">${s.t}</span></td><td class="${p.isCorrect ? 'text-good' : 'text-poor'} font-semibold">${p.isCorrect ? 'Correct' : 'Incorrect'}</td></tr>`;
        }).join('');


        if(modalDonutChartInstance) modalDonutChartInstance.destroy();
        const correct = questions.filter(q => q.isCorrect).length;
        modalDonutChartInstance = new Chart(document.getElementById('modalDonutChart').getContext('2d'), {type:'doughnut', data:{labels:['Correct','Incorrect'], datasets:[{data:[correct, questions.length - correct], backgroundColor:['#22c55e', '#ef4444']}]}});
       
        if(modalLineChartInstance) modalLineChartInstance.destroy();
        modalLineChartInstance = new Chart(document.getElementById('modalLineChart').getContext('2d'), {type:'line', data:{labels:studentData.scoreTrend.labels, datasets:[{label:'Score', data:studentData.scoreTrend.studentScores, borderColor: '#2a5266'}]}});
    }
   
    function renderQuestionView(question) {
        document.getElementById('question-stem').textContent = question.text;
        document.getElementById('question-explanation').textContent = question.explanation;
        const pacingContainer = document.getElementById('question-pacing-info');
        const diff = question.yourTime - question.classAvgTime;
        const s = (diff > 15) ? {t: 'Slower', c: 'pacing-slower'} : (diff < -15) ? {t: 'Faster', c: 'pacing-faster'} : {t: 'On Pace', c: 'pacing-on-pace'};
        pacingContainer.innerHTML = `<span class="${question.isCorrect ? 'text-good' : 'text-poor'} text-3xl">${question.isCorrect ? '✔' : '✖'}</span><p class="font-semibold mt-2">${question.isCorrect ? 'Correct' : 'Incorrect'}</p>
            <p class="mt-4">Your Time: <strong>${question.yourTime}s</strong> | Class Avg: <strong>${question.classAvgTime}s</strong></p>
            <div class="mt-2"><span class="pacing-badge ${s.c}">${s.t}</span></div>`;


        if (questionDonutChartInstance) questionDonutChartInstance.destroy();
        questionDonutChartInstance = new Chart(document.getElementById('question-donut-chart').getContext('2d'), { type: 'doughnut', data: { labels: ['Class Correct', 'Class Incorrect'], datasets: [{ data: [question.classCorrectPercent, 100 - question.classCorrectPercent], backgroundColor: ['#22c55e', '#ef4444'], hoverOffset: 4 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, cutout: '60%' } });
    }
   
    window.closeModal = function() {
        document.getElementById('detailModal').style.display = 'none';
    };
   
    init();
});
