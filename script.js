<script>
    function run() {
        const layout = document.getElementById("layout-field").innerText.trim().toUpperCase();

        const header1 = document.getElementById("header1-field").innerText;
        const header2 = document.getElementById("header2-field").innerText;
        const header3 = document.getElementById("header3-field").innerText;

        const terms1 = document.getElementById("terms1-field").innerText.split("|");
        const terms2 = document.getElementById("terms2-field").innerText.split("|");
        const terms3 = document.getElementById("terms3-field").innerText.split("|");

        let allTerms = [...terms1, ...terms2, ...terms3];

        if (layout === "V") {
            // Configuração para o layout vertical
            document.getElementById("term-table-horizontal").style.display = 'none';
            document.getElementById("term-table-vertical").style.display = 'table';

            document.getElementById("header1-vert").innerText = header1;
            document.getElementById("header2-vert").innerText = header2;
            document.getElementById("header3-vert").innerText = header3;
        } else {
            // Configuração para o layout horizontal (padrão)
            document.getElementById("term-table-horizontal").style.display = 'table';
            document.getElementById("term-table-vertical").style.display = 'none';

            document.getElementById("header1").innerText = header1;
            document.getElementById("header2").innerText = header2;
            document.getElementById("header3").innerText = header3;
        }

        const termsContainer = document.getElementById("terms-container");

        function initializeGame() {
            clearTable();
            allTerms = [...terms1, ...terms2, ...terms3].sort(() => Math.random() - 0.5);
            termsContainer.innerHTML = allTerms.map(term => `<div class="term draggable" draggable="true">${term}</div>`).join('');

            const draggableItems = document.querySelectorAll('.draggable');

            draggableItems.forEach(item => {
                item.addEventListener('dragstart', dragStart);
                item.addEventListener('dragend', dragEnd);
            });

            const dropzones = document.querySelectorAll('.dropzone');
            dropzones.forEach(zone => {
                zone.addEventListener('dragover', dragOver);
                zone.addEventListener('drop', drop);
            });

            document.getElementById("resetButton").style.display = 'none';
        }

        function clearTable() {
            const dropzones = document.querySelectorAll('.dropzone');
            dropzones.forEach(zone => {
                zone.innerHTML = ''; // Limpa todos os termos dentro das zonas de drop
                zone.classList.remove('correct', 'incorrect'); // Remove as classes de estilo
            });
        }

        function dragStart(e) {
            e.dataTransfer.setData('text/plain', e.target.innerText);
            setTimeout(() => e.target.classList.add('hide'), 0);
        }

        function dragEnd(e) {
            setTimeout(() => {
                e.target.classList.remove('hide');
            }, 0);
        }

        function dragOver(e) {
            e.preventDefault();
        }

        function drop(e) {
            e.preventDefault();
            const term = e.dataTransfer.getData('text/plain');
            const targetZone = e.target;

            if (targetZone.classList.contains('dropzone') || targetZone.classList.contains('term')) {
                if (targetZone.classList.contains('term')) {
                    targetZone.parentElement.innerHTML += `<div class="term draggable" draggable="true">${term}</div>`;
                } else {
                    targetZone.innerHTML += `<div class="term draggable" draggable="true">${term}</div>`;
                }

                const draggedItem = document.querySelector(`.draggable.hide`);
                if (draggedItem) draggedItem.remove();

                reattachDragEvents();
            } else {
                const draggedItem = document.querySelector(`.draggable.hide`);
                if (draggedItem) {
                    draggedItem.classList.remove('hide');
                }
            }
        }

        function reattachDragEvents() {
            const draggableItems = document.querySelectorAll('.draggable');
            draggableItems.forEach(item => {
                item.removeEventListener('dragstart', dragStart);
                item.removeEventListener('dragend', dragEnd);
                item.addEventListener('dragstart', dragStart);
                item.addEventListener('dragend', dragEnd);
            });
        }

        document.getElementById("checkButton").addEventListener('click', checkAnswers);
        document.getElementById("resetButton").addEventListener('click', initializeGame);

        function checkAnswers() {
            const dropzones = document.querySelectorAll('.dropzone');

            dropzones.forEach((zone, index) => {
                const termsInZone = Array.from(zone.getElementsByClassName('term'));
                let expectedTerms = [];

                if (layout === "V") {
                    if (zone.id === "col1-vert") expectedTerms = terms1;
                    if (zone.id === "col2-vert") expectedTerms = terms2;
                    if (zone.id === "col3-vert") expectedTerms = terms3;
                } else {
                    if (zone.id === "col1") expectedTerms = terms1;
                    if (zone.id === "col2") expectedTerms = terms2;
                    if (zone.id === "col3") expectedTerms = terms3;
                }

                termsInZone.forEach(termElement => {
                    const term = termElement.innerText.trim();
                    let isCorrect = false;

                    // Verifica se o termo completo é igual ou se é parte dos termos separados por |
                    expectedTerms.forEach(expectedTerm => {
                        const possibleAnswers = expectedTerm.split('|').map(t => t.trim());
                        if (possibleAnswers.includes(term)) {
                            isCorrect = true;
                        }
                    });

                    // Remove ícones anteriores
                    termElement.querySelectorAll('.question-plus-one, .question-minus-one').forEach(icon => icon.remove());

                    if (isCorrect) {
                        termElement.classList.add('correct');
                        termElement.classList.remove('incorrect');
                        // Adiciona ícone de +1
                        termElement.insertAdjacentHTML('beforeend', '<div class="question-plus-one"></div>');
                    } else {
                        termElement.classList.add('incorrect');
                        termElement.classList.remove('correct');
                        // Adiciona ícone de -1
                        termElement.insertAdjacentHTML('beforeend', '<div class="question-minus-one"></div>');
                    }
                });
            });

            document.getElementById("resetButton").style.display = 'block';
        }

        initializeGame();
    }

    run();
</script>
