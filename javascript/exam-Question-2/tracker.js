let activities = [];
let intensities = [];

function addActivity() {
    const activityElement = document.getElementById('activity');
    const intensityElement = document.getElementById('intensity');

    let activityInput = activityElement.value.trim();
    let intensityInput = parseInt(intensityElement.value.trim());

    if (activityInput !== '' && !isNaN(intensityInput) && intensityInput >= 1 && intensityInput <= 3) {
        
        activities.push(activityInput);
        intensities.push(intensityInput);

        const li = document.createElement('li');
        li.textContent = activityInput;

        switch(intensityInput) {
            case 1: 
                li.classList.add('low');
                break;
            case 2:
                li.classList.add('medium');
                break;
            case 3:
                li.classList.add('high');
                break;
        }

        // Complete button
        const completeButton = document.createElement('button');
        completeButton.textContent = ' Complete';
        completeButton.onclick = function() {
            li.classList.toggle('completed');
        };
        li.appendChild(completeButton);

        // Edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';

        editButton.onclick = function() {
            const newActivity = prompt('Edit Activity:', activityInput);
            if (newActivity !== null && newActivity.trim() !== '') {
                const activityIndex = activities.indexOf(activityInput);
                activities[activityIndex] = newActivity;
                li.firstChild.textContent = newActivity; 
                activityInput = newActivity; 
            }
        };
        li.appendChild(editButton);

        // Remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = ' Remove';

        removeButton.onclick = function() {
            activityList.removeChild(li);
            const activityIndex = activities.indexOf(activityInput);
            activities.splice(activityIndex, 1);
            intensities.splice(activityIndex, 1);
        };
        li.appendChild(removeButton);

        // activity list
        const activityList = document.getElementById('activityList');
        activityList.appendChild(li);
    } 
    else {
        alert('Please enter a valid activity and intensity between 1 and 3.');
    }
}
