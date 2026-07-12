import type { AnswerValue, ScreeningQuestion } from '../types';

interface QuestionFieldProps {
  question: ScreeningQuestion;
  value: AnswerValue | undefined;
  onChange: (value: AnswerValue) => void;
  disabled?: boolean;
}

export function QuestionField({
  question,
  value,
  onChange,
  disabled = false,
}: QuestionFieldProps) {
  const stringValue = typeof value === 'string' ? value : '';
  const arrayValue = Array.isArray(value) ? value : [];
  const inputId = `subex-question-${question.id}`;

  if (question.questionType === 'long_text') {
    return (
      <div className="subex-field-group subex-question-field">
        <label htmlFor={inputId}>
          {question.displayOrder}. {question.questionText}
          {question.isRequired && <span className="subex-required"> *</span>}
        </label>
        <textarea
          id={inputId}
          rows={5}
          value={stringValue}
          onChange={(event) => onChange(event.target.value)}
          required={question.isRequired}
          disabled={disabled}
          maxLength={5000}
          placeholder="Write your answer here..."
        />
      </div>
    );
  }

  if (question.questionType === 'single_choice') {
    return (
      <fieldset className="subex-field-group subex-question-field subex-choice-field">
        <legend>
          {question.displayOrder}. {question.questionText}
          {question.isRequired && <span className="subex-required"> *</span>}
        </legend>
        <div className="subex-choice-grid">
          {(question.options ?? []).map((option) => (
            <label className="subex-choice-card" key={option}>
              <input
                type="radio"
                name={inputId}
                value={option}
                checked={stringValue === option}
                onChange={() => onChange(option)}
                required={question.isRequired}
                disabled={disabled}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>
    );
  }

  if (question.questionType === 'multiple_choice') {
    return (
      <fieldset className="subex-field-group subex-question-field subex-choice-field">
        <legend>
          {question.displayOrder}. {question.questionText}
          {question.isRequired && <span className="subex-required"> *</span>}
        </legend>
        <p className="subex-field-hint">You may select more than one option.</p>
        <div className="subex-choice-grid">
          {(question.options ?? []).map((option) => {
            const checked = arrayValue.includes(option);
            return (
              <label className="subex-choice-card" key={option}>
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={disabled}
                  onChange={() =>
                    onChange(
                      checked
                        ? arrayValue.filter((item) => item !== option)
                        : [...arrayValue, option],
                    )
                  }
                />
                <span>{option}</span>
              </label>
            );
          })}
        </div>
      </fieldset>
    );
  }

  if (question.questionType === 'yes_no') {
    return (
      <div className="subex-field-group subex-question-field">
        <label htmlFor={inputId}>
          {question.displayOrder}. {question.questionText}
          {question.isRequired && <span className="subex-required"> *</span>}
        </label>
        <select
          id={inputId}
          value={stringValue}
          onChange={(event) => onChange(event.target.value)}
          required={question.isRequired}
          disabled={disabled}
        >
          <option value="">Select an answer</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
    );
  }

  const inputType =
    question.questionType === 'number'
      ? 'number'
      : question.questionType === 'url'
        ? 'url'
        : 'text';

  return (
    <div className="subex-field-group subex-question-field">
      <label htmlFor={inputId}>
        {question.displayOrder}. {question.questionText}
        {question.isRequired && <span className="subex-required"> *</span>}
      </label>
      <input
        id={inputId}
        type={inputType}
        value={stringValue}
        onChange={(event) => onChange(event.target.value)}
        required={question.isRequired}
        disabled={disabled}
        maxLength={question.questionType === 'url' ? 1000 : 5000}
        placeholder={
          question.questionType === 'url'
            ? 'https://...'
            : 'Write your answer here...'
        }
      />
    </div>
  );
}
