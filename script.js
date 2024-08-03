document.getElementById('diet-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    const activity = document.getElementById('activity').value;
    const symptoms = document.getElementById('symptoms').value;

    const caloriesNeeded = calculateCalories(age, gender, weight, height, activity);
    const recommendations = getRecommendations(caloriesNeeded);

    const dietPlan = `
         <h2>Your Diet Plan</h2>
         <p>Age: ${age}</p>
         <p>Gender: ${gender}</p>
         <p>Weight: ${weight} kg</p>
         <p>Height: ${height} cm</p>
         <p>Activity Level: ${activity}</p>
         <p>Calories needed: ${caloriesNeeded} kcal/day</p>
        <h3>Recommended Fruits/Vegetables</h3>
        <ul>
            ${recommendations.fruits.map(item => `<li>${item}</li>`).join('')}
        </ul>
        <h3>Recommended Meals</h3>
        <ul>
            ${recommendations.meals.map(item => `<li>${item}</li>`).join('')}
        </ul>
        <h3>Feelings</h3>
        <p>${symptoms}</p>
    `;

    const dietPlanSection = document.getElementById('diet-plan');
    dietPlanSection.innerHTML = dietPlan;

    // Show diet plan section and hide home section
    document.getElementById('home-section').classList.add('hidden');
    document.getElementById('diet-plan-section').classList.remove('hidden');
});

document.getElementById('back-to-home').addEventListener('click', function() {
    // Show home section and hide diet plan section
    document.getElementById('home-section').classList.remove('hidden');
    document.getElementById('diet-plan-section').classList.add('hidden');
});

function calculateCalories(age, gender, weight, height, activity) {
    let bmr;
    if (gender === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    const activityMultiplier = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        'very-active': 1.9
    };

    return Math.round(bmr * activityMultiplier[activity]);
}

function getRecommendations(calories) {
    const lowCaloriesFruits = [
        "Apple (52 kcal per 100g)",
        "Orange (43 kcal per 100g)",
        "Strawberry (32 kcal per 100g)"
    ];

    const mediumCaloriesFruits = [
        "Banana (96 kcal per 100g)",
        "Grapes (69 kcal per 100g)",
        "Mango (60 kcal per 100g)"
    ];

    const highCaloriesFruits = [
        "Avocado (160 kcal per 100g)",
        "Durian (147 kcal per 100g)",
        "Pomegranate (83 kcal per 100g)"
    ];

    const pakistaniMeals = {
        low: [
            "Dal with brown rice",
            "Chicken vegetable soup",
            "Mixed vegetable salad"
        ],
        medium: [
            "Chicken biryani",
            "Mutton curry with roti",
            "Grilled fish with vegetables"
        ],
        high: [
            "Beef karahi with naan",
            "Butter chicken with paratha",
            "Lamb biryani"
        ]
    };

    let fruits, meals;

    if (calories < 2000) {
        fruits = lowCaloriesFruits;
        meals = pakistaniMeals.low;
    } else if (calories < 2500) {
        fruits = mediumCaloriesFruits;
        meals = pakistaniMeals.medium;
    } else {
        fruits = highCaloriesFruits;
        meals = pakistaniMeals.high;
    }

    return { fruits, meals };
}
