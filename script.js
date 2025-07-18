document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        categoryTabs: document.getElementById('category-tabs'),
        inputUS: document.getElementById('input-us'),
        unitUS: document.getElementById('unit-us'),
        inputJP: document.getElementById('input-jp'),
        unitJP: document.getElementById('unit-jp'),
    };

    let currentCategory = 'length';
    let activeInput = null;

    const units = {
        length: {
            us: { 'in': 'Inches', 'ft': 'Feet', 'yd': 'Yards', 'mi': 'Miles' },
            jp: { 'cm': 'Centimeters', 'm': 'Meters', 'km': 'Kilometers' }
        },
        weight: {
            us: { 'oz': 'Ounces', 'lb': 'Pounds' },
            jp: { 'g': 'Grams', 'kg': 'Kilograms' }
        },
        volume: {
            us: { 'oz': 'Fluid Ounces', 'pint': 'Pints', 'qt': 'Quarts', 'gal': 'Gallons' },
            jp: { 'ml': 'Milliliters', 'l': 'Liters' }
        },
        temperature: {
            us: { 'f': 'Fahrenheit' },
            jp: { 'c': 'Celsius' }
        }
    };

    const conversionFactors = {
        // Base unit: meter
        length: {
            m: 1,
            cm: 0.01,
            km: 1000,
            in: 0.0254,
            ft: 0.3048,
            yd: 0.9144,
            mi: 1609.34
        },
        // Base unit: gram
        weight: {
            g: 1,
            kg: 1000,
            oz: 28.3495,
            lb: 453.592
        },
        // Base unit: liter
        volume: {
            l: 1,
            ml: 0.001,
            oz: 0.0295735,
            pint: 0.473176,
            qt: 0.946353,
            gal: 3.78541
        }
    };

    function populateUnits() {
        const categoryUnits = units[currentCategory];
        
        elements.unitUS.innerHTML = '';
        for (const unit in categoryUnits.us) {
            const option = document.createElement('option');
            option.value = unit;
            option.textContent = categoryUnits.us[unit];
            elements.unitUS.appendChild(option);
        }

        elements.unitJP.innerHTML = '';
        for (const unit in categoryUnits.jp) {
            const option = document.createElement('option');
            option.value = unit;
            option.textContent = categoryUnits.jp[unit];
            elements.unitJP.appendChild(option);
        }
    }

    function convert() {
        if (!activeInput) return;

        const sourceInput = activeInput;
        const targetInput = (sourceInput === elements.inputUS) ? elements.inputJP : elements.inputUS;
        const sourceUnit = (sourceInput === elements.inputUS) ? elements.unitUS.value : elements.unitJP.value;
        const targetUnit = (targetInput === elements.inputJP) ? elements.unitJP.value : elements.unitUS.value;
        const sourceValue = parseFloat(sourceInput.value);

        if (isNaN(sourceValue)) {
            targetInput.value = '';
            return;
        }

        let result;

        if (currentCategory === 'temperature') {
            if (sourceUnit === 'f') { // F to C
                result = (sourceValue - 32) * 5 / 9;
            } else { // C to F
                result = (sourceValue * 9 / 5) + 32;
            }
        } else {
            const factors = conversionFactors[currentCategory];
            const baseValue = sourceValue * factors[sourceUnit];
            result = baseValue / factors[targetUnit];
        }
        
        if (result % 1 !== 0) {
            targetInput.value = result.toFixed(3);
        } else {
            targetInput.value = result;
        }
    }

    elements.categoryTabs.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            currentCategory = e.target.dataset.category;
            
            // Update active button style
            document.querySelector('.category-tabs button.active').classList.remove('active');
            e.target.classList.add('active');

            populateUnits();
            convert();
        }
    });

    [elements.inputUS, elements.inputJP].forEach(input => {
        input.addEventListener('focus', (e) => {
            activeInput = e.target;
        });
        input.addEventListener('input', convert);
    });

    [elements.unitUS, elements.unitJP].forEach(select => {
        select.addEventListener('change', () => {
            // When a unit changes, we need to determine which input was the last active one
            // to decide the direction of conversion.
            if (activeInput) {
                convert();
            }
        });
    });

    // Initial setup
    populateUnits();
    activeInput = elements.inputUS; // Set a default active input

});
