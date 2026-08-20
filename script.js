document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        categoryTabs: document.getElementById('category-tabs'),
        inputUS: document.getElementById('input-us'),
        unitUS: document.getElementById('unit-us'),
        labelUS: document.getElementById('label-us'),
        subUS: document.getElementById('sub-us'),
        inputJP: document.getElementById('input-jp'),
        unitJP: document.getElementById('unit-jp'),
        labelJP: document.getElementById('label-jp'),
        subJP: document.getElementById('sub-jp'),
        swapBtn: document.getElementById('swap-btn'),
        formulaText: document.getElementById('formula-text'),
        formulaLabel: document.getElementById('formula-label'),
        headerSubtitle: document.getElementById('header-subtitle'),
        footerText: document.getElementById('footer-text'),
        langJaBtn: document.getElementById('lang-ja-btn'),
        langEnBtn: document.getElementById('lang-en-btn'),
    };

    let currentCategory = 'length';
    let currentLang = 'ja';
    let activeInput = elements.inputUS;

    const i18n = {
        ja: {
            title: '日米単位変換器 | US-Japan Unit Converter',
            subtitle: '日米単位相互変換',
            tabs: {
                length: '長さ',
                weight: '重さ',
                volume: '量',
                area: '面積',
                temperature: '温度'
            },
            tabsSub: {
                length: 'Length',
                weight: 'Weight',
                volume: 'Volume',
                area: 'Area',
                temperature: 'Temp'
            },
            usLabel: 'US',
            usSub: 'アメリカ',
            jpLabel: 'Japan',
            jpSub: '日本',
            swapTitle: '単位・方向を入れ替え',
            formulaLabel: '基準変換比率',
            footer: '&copy; 2025 cuio.net | 日米単位変換器',
            units: {
                length: {
                    us: {
                        'in': 'インチ (in)',
                        'ft': 'フィート (ft)',
                        'yd': 'ヤード (yd)',
                        'mi': 'マイル (mi)'
                    },
                    jp: {
                        'cm': 'センチメートル (cm)',
                        'm': 'メートル (m)',
                        'km': 'キロメートル (km)'
                    }
                },
                weight: {
                    us: {
                        'oz': 'オンス (oz)',
                        'lb': 'ポンド (lb)'
                    },
                    jp: {
                        'g': 'グラム (g)',
                        'kg': 'キログラム (kg)'
                    }
                },
                volume: {
                    us: {
                        'oz': '液量オンス (fl oz)',
                        'pint': 'パイント (pt)',
                        'qt': 'クォート (qt)',
                        'gal': 'ガロン (gal)'
                    },
                    jp: {
                        'ml': 'ミリリットル (mL)',
                        'l': 'リットル (L)'
                    }
                },
                area: {
                    us: {
                        'sq_in': '平方インチ (in²)',
                        'sq_ft': '平方フィート (ft²)',
                        'sq_yd': '平方ヤード (yd²)',
                        'acre': 'エーカー (acre)',
                        'sq_mi': '平方マイル (mi²)'
                    },
                    jp: {
                        'cm2': '平方センチ (cm²)',
                        'm2': '平方メートル (m²)',
                        'km2': '平方キロ (km²)',
                        'ha': 'ヘクタール (ha)',
                        'tsubo': '坪 (tsubo)'
                    }
                },
                temperature: {
                    us: { 'f': '華氏 (℉)' },
                    jp: { 'c': '摂氏 (℃)' }
                }
            }
        },
        en: {
            title: 'US-Japan Unit Converter',
            subtitle: 'US & Japan Unit Conversion',
            tabs: {
                length: 'Length',
                weight: 'Weight',
                volume: 'Volume',
                area: 'Area',
                temperature: 'Temp'
            },
            tabsSub: {
                length: '',
                weight: '',
                volume: '',
                area: '',
                temperature: ''
            },
            usLabel: 'US',
            usSub: 'United States',
            jpLabel: 'Japan',
            jpSub: 'Metric / JP',
            swapTitle: 'Swap units',
            formulaLabel: 'Conversion Rate',
            footer: '&copy; 2025 cuio.net | US-Japan Unit Converter',
            units: {
                length: {
                    us: {
                        'in': 'Inch (in)',
                        'ft': 'Foot (ft)',
                        'yd': 'Yard (yd)',
                        'mi': 'Mile (mi)'
                    },
                    jp: {
                        'cm': 'Centimeter (cm)',
                        'm': 'Meter (m)',
                        'km': 'Kilometer (km)'
                    }
                },
                weight: {
                    us: {
                        'oz': 'Ounce (oz)',
                        'lb': 'Pound (lb)'
                    },
                    jp: {
                        'g': 'Gram (g)',
                        'kg': 'Kilogram (kg)'
                    }
                },
                volume: {
                    us: {
                        'oz': 'Fluid Ounce (fl oz)',
                        'pint': 'Pint (pt)',
                        'qt': 'Quart (qt)',
                        'gal': 'Gallon (gal)'
                    },
                    jp: {
                        'ml': 'Milliliter (mL)',
                        'l': 'Liter (L)'
                    }
                },
                area: {
                    us: {
                        'sq_in': 'Square Inch (in²)',
                        'sq_ft': 'Square Foot (ft²)',
                        'sq_yd': 'Square Yard (yd²)',
                        'acre': 'Acre (acre)',
                        'sq_mi': 'Square Mile (mi²)'
                    },
                    jp: {
                        'cm2': 'Square Centimeter (cm²)',
                        'm2': 'Square Meter (m²)',
                        'km2': 'Square Kilometer (km²)',
                        'ha': 'Hectare (ha)',
                        'tsubo': 'Tsubo (tsubo)'
                    }
                },
                temperature: {
                    us: { 'f': 'Fahrenheit (℉)' },
                    jp: { 'c': 'Celsius (℃)' }
                }
            }
        }
    };

    const conversionFactors = {
        // Base unit: meter (m)
        length: {
            m: 1,
            cm: 0.01,
            km: 1000,
            in: 0.0254,
            ft: 0.3048,
            yd: 0.9144,
            mi: 1609.344
        },
        // Base unit: gram (g)
        weight: {
            g: 1,
            kg: 1000,
            oz: 28.349523125,
            lb: 453.59237
        },
        // Base unit: liter (L)
        volume: {
            l: 1,
            ml: 0.001,
            oz: 0.0295735295625,
            pint: 0.473176473,
            qt: 0.946352946,
            gal: 3.785411784
        },
        // Base unit: square meter (m²)
        area: {
            m2: 1,
            cm2: 0.0001,
            km2: 1000000,
            ha: 10000,
            tsubo: 3.305785,
            sq_in: 0.00064516,
            sq_ft: 0.09290304,
            sq_yd: 0.83612736,
            acre: 4046.8564224,
            sq_mi: 2589988.110336
        }
    };

    // Short symbol mappings for clean formula display
    const unitSymbols = {
        ja: {
            in: 'in', ft: 'ft', yd: 'yd', mi: 'mi',
            cm: 'cm', m: 'm', km: 'km',
            oz: 'oz', lb: 'lb', g: 'g', kg: 'kg',
            pint: 'pt', qt: 'qt', gal: 'gal', ml: 'mL', l: 'L',
            sq_in: 'in²', sq_ft: 'ft²', sq_yd: 'yd²', acre: 'acre', sq_mi: 'mi²',
            cm2: 'cm²', m2: 'm²', km2: 'km²', ha: 'ha', tsubo: '坪',
            f: '℉', c: '℃'
        },
        en: {
            in: 'in', ft: 'ft', yd: 'yd', mi: 'mi',
            cm: 'cm', m: 'm', km: 'km',
            oz: 'oz', lb: 'lb', g: 'g', kg: 'kg',
            pint: 'pt', qt: 'qt', gal: 'gal', ml: 'mL', l: 'L',
            sq_in: 'in²', sq_ft: 'ft²', sq_yd: 'yd²', acre: 'acre', sq_mi: 'mi²',
            cm2: 'cm²', m2: 'm²', km2: 'km²', ha: 'ha', tsubo: 'tsubo',
            f: '℉', c: '℃'
        }
    };

    function detectInitialLanguage() {
        const saved = localStorage.getItem('user_lang');
        if (saved === 'ja' || saved === 'en') {
            return saved;
        }

        const browserLanguages = navigator.languages || [navigator.language || navigator.userLanguage || ''];
        for (const lang of browserLanguages) {
            if (lang && lang.toLowerCase().startsWith('ja')) {
                return 'ja';
            }
        }
        return 'en';
    }

    function setLanguage(lang, persist = false) {
        currentLang = lang;
        if (persist) {
            localStorage.setItem('user_lang', lang);
        }

        document.documentElement.lang = lang;
        document.title = i18n[lang].title;

        if (elements.headerSubtitle) {
            elements.headerSubtitle.textContent = i18n[lang].subtitle;
        }

        // Update tabs
        const tabButtons = elements.categoryTabs.querySelectorAll('button');
        tabButtons.forEach(btn => {
            const cat = btn.dataset.category;
            const jpSpan = btn.querySelector('.tab-jp');
            const enSpan = btn.querySelector('.tab-en');
            if (jpSpan && i18n[lang].tabs[cat]) {
                jpSpan.textContent = i18n[lang].tabs[cat];
            }
            if (enSpan) {
                enSpan.textContent = i18n[lang].tabsSub[cat] || '';
            }
        });

        // Update group labels
        if (elements.labelUS) {
            elements.labelUS.innerHTML = `${i18n[lang].usLabel} <span class="country-sub" id="sub-us">${i18n[lang].usSub}</span>`;
        }
        if (elements.labelJP) {
            elements.labelJP.innerHTML = `${i18n[lang].jpLabel} <span class="country-sub" id="sub-jp">${i18n[lang].jpSub}</span>`;
        }

        // Update swap button title & aria-label
        if (elements.swapBtn) {
            elements.swapBtn.title = i18n[lang].swapTitle;
            elements.swapBtn.setAttribute('aria-label', i18n[lang].swapTitle);
        }

        // Update formula label
        if (elements.formulaLabel) {
            elements.formulaLabel.textContent = i18n[lang].formulaLabel;
        }

        // Update footer
        if (elements.footerText) {
            elements.footerText.innerHTML = i18n[lang].footer;
        }

        // Update language switcher buttons
        if (elements.langJaBtn && elements.langEnBtn) {
            elements.langJaBtn.classList.toggle('active', lang === 'ja');
            elements.langEnBtn.classList.toggle('active', lang === 'en');
        }

        // Update unit options preserving selected value
        populateUnits();
        convert();
    }

    function populateUnits() {
        const categoryUnits = i18n[currentLang].units[currentCategory];
        const prevUS = elements.unitUS.value;
        const prevJP = elements.unitJP.value;
        
        elements.unitUS.innerHTML = '';
        for (const unit in categoryUnits.us) {
            const option = document.createElement('option');
            option.value = unit;
            option.textContent = categoryUnits.us[unit];
            elements.unitUS.appendChild(option);
        }
        if (prevUS && categoryUnits.us[prevUS]) {
            elements.unitUS.value = prevUS;
        }

        elements.unitJP.innerHTML = '';
        for (const unit in categoryUnits.jp) {
            const option = document.createElement('option');
            option.value = unit;
            option.textContent = categoryUnits.jp[unit];
            elements.unitJP.appendChild(option);
        }
        if (prevJP && categoryUnits.jp[prevJP]) {
            elements.unitJP.value = prevJP;
        }
    }

    function formatNumber(num) {
        if (isNaN(num)) return '';
        if (num === 0) return '0';
        
        const absNum = Math.abs(num);
        if (absNum < 0.000001 || absNum >= 1000000000) {
            return num.toExponential(4);
        }

        // Clean precision formatting: up to 6 decimal places, removing trailing zeros
        const formatted = Number(Math.round(parseFloat(num + 'e6')) + 'e-6');
        return formatted.toString();
    }

    function updateFormulaDisplay(usUnit, jpUnit) {
        const symbols = unitSymbols[currentLang] || unitSymbols.ja;
        const symbolUS = symbols[usUnit] || usUnit;
        const symbolJP = symbols[jpUnit] || jpUnit;

        if (currentCategory === 'temperature') {
            elements.formulaText.textContent = `℃ = (℉ - 32) × 5/9  |  ℉ = (℃ × 9/5) + 32`;
            return;
        }

        const factors = conversionFactors[currentCategory];
        // Calculate 1 US unit in JP unit
        const oneUSToJP = factors[usUnit] / factors[jpUnit];
        const formattedJP = formatNumber(oneUSToJP);

        elements.formulaText.textContent = `1 ${symbolUS} = ${formattedJP} ${symbolJP}`;
    }

    function convert() {
        if (!activeInput) return;

        const isUSSource = (activeInput === elements.inputUS);
        const sourceInput = isUSSource ? elements.inputUS : elements.inputJP;
        const targetInput = isUSSource ? elements.inputJP : elements.inputUS;
        const usUnit = elements.unitUS.value;
        const jpUnit = elements.unitJP.value;

        updateFormulaDisplay(usUnit, jpUnit);

        const sourceValue = parseFloat(sourceInput.value);

        if (isNaN(sourceValue)) {
            targetInput.value = '';
            return;
        }

        let result;

        if (currentCategory === 'temperature') {
            if (isUSSource) { // F to C
                result = (sourceValue - 32) * 5 / 9;
            } else { // C to F
                result = (sourceValue * 9 / 5) + 32;
            }
        } else {
            const factors = conversionFactors[currentCategory];
            const sourceUnitKey = isUSSource ? usUnit : jpUnit;
            const targetUnitKey = isUSSource ? jpUnit : usUnit;

            const baseValue = sourceValue * factors[sourceUnitKey];
            result = baseValue / factors[targetUnitKey];
        }
        
        targetInput.value = formatNumber(result);
    }

    function swapUnits() {
        // Swap values
        const tempVal = elements.inputUS.value;
        elements.inputUS.value = elements.inputJP.value;
        elements.inputJP.value = tempVal;

        // Toggle active input direction
        if (activeInput === elements.inputUS) {
            activeInput = elements.inputJP;
        } else {
            activeInput = elements.inputUS;
        }

        convert();
    }

    elements.categoryTabs.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (btn && btn.dataset.category) {
            currentCategory = btn.dataset.category;
            
            // Update active button style
            const currentActive = elements.categoryTabs.querySelector('button.active');
            if (currentActive) currentActive.classList.remove('active');
            btn.classList.add('active');

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
            if (activeInput) {
                convert();
            }
        });
    });

    if (elements.swapBtn) {
        elements.swapBtn.addEventListener('click', swapUnits);
    }

    if (elements.langJaBtn) {
        elements.langJaBtn.addEventListener('click', () => setLanguage('ja', true));
    }
    if (elements.langEnBtn) {
        elements.langEnBtn.addEventListener('click', () => setLanguage('en', true));
    }

    // Initial setup
    const initialLang = detectInitialLanguage();
    setLanguage(initialLang, false);
    activeInput = elements.inputUS;
});

