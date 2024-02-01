describe("End-to-End Test for Survey", () => {
  
  beforeEach(() => {
    cy.visit("/");
  });

  it("Completes the survey", () => {
    // Проверяем отображение первого вопроса
    cy.get('[data-testid="question-text"]').should("be.visible");

    let iterationCount = 0;

    cy.request("https://the-trivia-api.com/v2/questions").then((response) => {

      const totalQuestions = response.body.length;

      const completeSurvey = () => {
        if (iterationCount < totalQuestions) {
          // Выбираем случайный вариант ответа
          cy.get('input[type="radio"]').then(($radios) => {
            const randomIndex = Math.floor(Math.random() * $radios.length);
            cy.wrap($radios[randomIndex]).click();
            // ПереNavig к следующему вопросу
            cy.contains("Следующий вопрос").should("be.visible").click();

            iterationCount++;
            completeSurvey();
          });
        }
      };

      completeSurvey();
    });

    // Проверяем отображение страницы с результатами
    cy.contains("Результаты:").should("be.visible");

    // Проверяем наличие кнопки для повторного прохождения опроса
    cy.contains("Повторить тест").should("be.visible");
  });
});
