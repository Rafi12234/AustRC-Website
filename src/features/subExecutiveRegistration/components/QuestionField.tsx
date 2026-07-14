import type {
  AnswerValue,
  QuestionAnswer,
  ScreeningQuestion,
} from '../types';

interface QuestionFieldProps {
  question: ScreeningQuestion;

  answer:
    | QuestionAnswer
    | undefined;

  onChange: (
    answer: QuestionAnswer,
  ) => void;

  scope: string;

  disabled?: boolean;
}

const emptyAnswer:
  QuestionAnswer = {
    value: '',
    otherText: '',
  };

export function QuestionField({
  question,

  answer = emptyAnswer,

  onChange,

  scope,

  disabled = false,
}: QuestionFieldProps) {
  const stringValue =
    typeof answer.value ===
    'string'
      ? answer.value
      : '';

  const arrayValue =
    Array.isArray(answer.value)
      ? answer.value
      : [];

  const inputId =
    `subex-${scope}-question-${question.id}`;

  const showsOtherInput =
    Array.isArray(answer.value)
      ? answer.value.includes(
          'Other',
        )
      : answer.value === 'Other';

  function changeValue(
    value: AnswerValue,
  ) {
    const stillUsesOther =
      (
        Array.isArray(value) &&
        value.includes('Other')
      ) ||
      value === 'Other';

    onChange({
      value,

      otherText:
        stillUsesOther
          ? answer.otherText
          : '',
    });
  }

  const heading = (
    <>
      {question.displayOrder}.{' '}
      {question.questionText}

      {question.isRequired && (
        <span className="subex-required">
          {' '}*
        </span>
      )}
    </>
  );

  if (
    question.questionType ===
    'long_text'
  ) {
    return (
      <div className="subex-field-group subex-question-field">
        <label htmlFor={inputId}>
          {heading}
        </label>

        {question.helpText && (
          <p className="subex-field-hint">
            {question.helpText}
          </p>
        )}

        <textarea
          id={inputId}
          rows={5}
          value={stringValue}

          onChange={(event) =>
            changeValue(
              event.target.value,
            )
          }

          required={
            question.isRequired
          }

          disabled={disabled}
          maxLength={5000}

          placeholder="Write your answer here..."
        />
      </div>
    );
  }

  if (
    question.questionType ===
      'single_choice' ||
    question.questionType ===
      'yes_no'
  ) {
    const options =
      question.questionType ===
      'yes_no'
        ? ['Yes', 'No']
        : question.options ?? [];

    return (
      <fieldset className="subex-field-group subex-question-field subex-choice-field">
        <legend>
          {heading}
        </legend>

        {question.helpText && (
          <p className="subex-field-hint">
            {question.helpText}
          </p>
        )}

        <div className="subex-choice-grid">
          {options.map(
            (option) => (
              <label
                className="subex-choice-card"
                key={option}
              >
                <input
                  type="radio"
                  name={inputId}
                  value={option}

                  checked={
                    stringValue ===
                    option
                  }

                  onChange={() =>
                    changeValue(option)
                  }

                  required={
                    question.isRequired
                  }

                  disabled={disabled}
                />

                <span>
                  {option}
                </span>
              </label>
            ),
          )}
        </div>

        {question.allowOther &&
          showsOtherInput && (
            <input
              className="subex-other-input"
              type="text"

              value={
                answer.otherText
              }

              onChange={(event) =>
                onChange({
                  ...answer,

                  otherText:
                    event.target
                      .value,
                })
              }

              required
              disabled={disabled}
              maxLength={1000}

              placeholder="Please specify..."
            />
          )}
      </fieldset>
    );
  }

  if (
    question.questionType ===
    'multiple_choice'
  ) {
    return (
      <fieldset className="subex-field-group subex-question-field subex-choice-field">
        <legend>
          {heading}
        </legend>

        <p className="subex-field-hint">
          {question.helpText ||
            'You may select more than one option.'}
        </p>

        <div className="subex-choice-grid">
          {(question.options ?? [])
            .map((option) => {
              const checked =
                arrayValue.includes(
                  option,
                );

              return (
                <label
                  className="subex-choice-card"
                  key={option}
                >
                  <input
                    type="checkbox"

                    checked={checked}

                    disabled={
                      disabled
                    }

                    onChange={() =>
                      changeValue(
                        checked
                          ? arrayValue
                              .filter(
                                (
                                  item,
                                ) =>
                                  item !==
                                  option,
                              )
                          : [
                              ...arrayValue,
                              option,
                            ],
                      )
                    }
                  />

                  <span>
                    {option}
                  </span>
                </label>
              );
            })}
        </div>

        {question.allowOther &&
          showsOtherInput && (
            <input
              className="subex-other-input"
              type="text"

              value={
                answer.otherText
              }

              onChange={(event) =>
                onChange({
                  ...answer,

                  otherText:
                    event.target
                      .value,
                })
              }

              required
              disabled={disabled}
              maxLength={1000}

              placeholder="Please specify..."
            />
          )}
      </fieldset>
    );
  }

  return (
    <div className="subex-field-group subex-question-field">
      <label htmlFor={inputId}>
        {heading}
      </label>

      {question.helpText && (
        <p className="subex-field-hint">
          {question.helpText}
        </p>
      )}

      <input
        id={inputId}

        type={
          question.questionType ===
          'url'
            ? 'url'
            : 'text'
        }

        value={stringValue}

        onChange={(event) =>
          changeValue(
            event.target.value,
          )
        }

        required={
          question.isRequired
        }

        disabled={disabled}

        maxLength={
          question.questionType ===
          'url'
            ? 1000
            : 5000
        }

        placeholder={
          question.questionType ===
          'url'
            ? 'https://...'
            : 'Write your answer here...'
        }
      />
    </div>
  );
}