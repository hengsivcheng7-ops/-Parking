document.getElementById('submit').addEventListener('click', function() {
    // 1. ទាញយកតម្លៃពី Input នីមួយៗ
    const vehicle = document.getElementById('vehicleType').value;
    const timeInStr = document.getElementById('timeIn').value;
    const timeOutStr = document.getElementById('timeOut').value;

    // 2. ពិនិត្យមើលថាតើអ្នកប្រើប្រាស់បានបញ្ចូលម៉ោងចូល និងម៉ោងចេញហើយឬនៅ
    if (!timeInStr || !timeOutStr) {
        alert("សូមបញ្ចូលម៉ោងចូល និងម៉ោងចេញឱ្យបានត្រឹមត្រូវ!");
        return;
    }

    // 3. បំប្លែងទម្រង់ម៉ោង (HH:MM) ទៅជានាទីសរុបដើម្បីងាយស្រួលគណនា
    const [hoursIn, minsIn] = timeInStr.split(':').map(Number);
    const [hoursOut, minsOut] = timeOutStr.split(':').map(Number);

    let timeInMinutes = hoursIn * 60 + minsIn;
    let timeOutMinutes = hoursOut * 60 + minsOut;

    // 4. ដោះស្រាយករណីចតឆ្លងយប់ (ឧទាហរណ៍៖ ចូលម៉ោង 22:00 ចេញម៉ោង 02:00 ថ្ងៃបន្ទាប់)
    if (timeOutMinutes < timeInMinutes) {
        timeOutMinutes += 24 * 60; // បូកបន្ថែម ២៤ ម៉ោងជាថេរវេលា
    }

    // 5. គណនារយៈពេលចតសរុបជាម៉ោង (ប្រើ Math.ceil ដើម្បីបង្គត់ឡើង បើលើសទោះ ១នាទីក៏គិត ១ម៉ោងពេញ)
    const durationMinutes = timeOutMinutes - timeInMinutes;
    let totalHours = Math.ceil(durationMinutes / 60);

    // ការពារករណីដាក់ម៉ោងចូលនិងចេញដូចគ្នាចំ (0 នាទី) ឱ្យគិត ១ម៉ោង
    if (totalHours === 0) totalHours = 1;

    let rate = 0;

    // 6. ពិនិត្យលក្ខខណ្ឌតម្លៃទៅតាមប្រភេទយានជំនិះ
    if (vehicle === 'car') {
        // លក្ខខណ្ឌសម្រាប់ ឡាន
        if (totalHours <= 8) {
            rate = 500;  // ផ្ញើត្រឹម ៨ ម៉ោងចុះក្រោម គិត ១ម៉ោង = ៥០០៛
        } else {
            rate = 1000; // ផ្ញើលើសពី ៨ ម៉ោង គិត ១ម៉ោង = ១០០០៛
        }
    } else if (vehicle === 'moto') {
        // លក្ខខណ្ឌសម្រាប់ ម៉ូតូ
        if (totalHours <= 8) {
            rate = 200;  // ផ្ញើត្រឹម ៨ ម៉ោងចុះក្រោម គិត ១ម៉ោង = ២០០៛
        } else {
            rate = 300;  // ផ្ញើលើសពី ៨ ម៉ោង គិត ១ម៉ោង = ៣០០៛
        }
    }

    // 7. គណនាតម្លៃសរុបជា រៀល និង ដុល្លារ
    const totalRiel = totalHours * rate;
    const totalDollar = totalRiel / 4000; // អត្រាប្តូរប្រាក់ឧបមា $1 = 4000៛

    // 8. បង្ហាញលទ្ធផលទៅលើប្រអប់ Input វិញ
    // ប្រើ .toLocaleString() ដើម្បីដាក់ក្បៀសចំណាំខ្ទង់ (ឧទាហរណ៍៖ 4,000)
    document.getElementById('riel').value = totalRiel.toLocaleString();
    document.getElementById('dollar').value = totalDollar.toFixed(2);
});