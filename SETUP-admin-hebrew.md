# הפעלת עמוד הניהול לפעילויות (באגי קידס)

1. ב-GitHub: צור repo חדש (פרטי או ציבורי) והעלה אליו את כל תוכן התיקייה הזו (index.html, netlify.toml, build.js, admin, content, img ועוד). הקבצים צריכים להיות בשורש ה-repo.
2. פתח את admin/config.yml ושנה את השורה `repo: OWNER/REPO` לשם המשתמש שלך ושם ה-repo, למשל `repo: noam123/buggykids`.
3. ב-Netlify: Add new site, Import an existing project, בחר GitHub ואת ה-repo. הגדרות בנייה: Build command `node build.js`, Publish directory `.` (הן כבר ב-netlify.toml).
4. ב-GitHub: Settings, Developer settings, OAuth Apps, New OAuth App.
   - Homepage URL: כתובת האתר ב-Netlify
   - Authorization callback URL: `https://api.netlify.com/auth/done`
   שמור את ה-Client ID ואת ה-Client Secret.
5. ב-Netlify, באתר: Site configuration, Access & security, OAuth (שמות התפריטים עשויים להשתנות קצת), Install provider, GitHub, הדבק Client ID ו-Client Secret.
6. פתח `כתובת-האתר/admin`, התחבר עם GitHub, הוסף פעילות ולחץ Publish. האתר יתעדכן אחרי דקה בערך.

הערות:
- כל מי שנכנס לניהול צריך חשבון GitHub עם הרשאת כתיבה ל-repo.
- תמונות שמועלות מהניהול לא עוברות כיווץ אוטומטי. כדאי להעלות תמונות קטנות (עד כ-300KB).
- המחירים הקיימים, לוח העדכונים והשעות נשארים מגיליון Google כמו קודם.
