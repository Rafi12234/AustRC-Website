import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type FormEvent,
} from 'react';
import {
  AlertCircle,
  CheckCircle2,
  ClipboardCheck,
  Database,
  LoaderCircle,
  Send,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { useTokens } from '@/tokens/useTokens';
import {
  ApiError,
  getFormOptions,
  getTeamQuestions,
  submitApplication,
} from './api/registrationApi';
import { QuestionField } from './components/QuestionField';
import type {
  AnswerValue,
  ApplicationFormData,
  ApplicationSubmissionResult,
  FormOptions,
  ScreeningQuestion,
} from './types';
import './subExecutiveRegistration.css';

const initialForm: ApplicationFormData = {
  fullName: '',
  departmentId: '',
  studentId: '',
  semesterId: '',
  teamId: '',
  eduEmail: '',
  personalEmail: '',
  phoneNumber: '',
  linkedinUrl: '',
};

function formatDate(value: string | null): string {
  if (!value) return 'Not specified';

  return new Intl.DateTimeFormat('en-BD', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Dhaka',
  }).format(new Date(value));
}

export function SubExecutiveRegistrationPage() {
  const t = useTokens();
  const [options, setOptions] = useState<FormOptions | null>(null);
  const [questions, setQuestions] = useState<ScreeningQuestion[]>([]);
  const [form, setForm] = useState<ApplicationFormData>(initialForm);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<ApplicationSubmissionResult | null>(null);

  const themeVariables = {
    '--subex-page-bg': t.pageBg,
    '--subex-page-alt': t.pageBgAlt,
    '--subex-surface': t.surfaceCard,
    '--subex-surface-hover': t.surfaceCardHover,
    '--subex-text-primary': t.textPrimary,
    '--subex-text-secondary': t.textSecondary,
    '--subex-text-muted': t.textMutedMid,
    '--subex-border': t.borderDefault,
    '--subex-border-brand': t.borderBrand,
    '--subex-brand': t.brandGreen,
    '--subex-brand-dark': t.brandGreenDark,
  } as CSSProperties;

  useEffect(() => {
    let cancelled = false;

    async function loadOptions() {
      try {
        setLoadingOptions(true);
        const data = await getFormOptions();
        if (!cancelled) setOptions(data);
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : 'Could not load the registration form.',
          );
        }
      } finally {
        if (!cancelled) setLoadingOptions(false);
      }
    }

    void loadOptions();

    return () => {
      cancelled = true;
    };
  }, []);

  const selectedTeam = useMemo(
    () => options?.teams.find((team) => team.id === form.teamId) ?? null,
    [form.teamId, options],
  );

  async function handleTeamChange(teamId: string) {
    setForm((current) => ({ ...current, teamId }));
    setQuestions([]);
    setAnswers({});
    setError('');

    if (!teamId) return;

    try {
      setLoadingQuestions(true);
      const data = await getTeamQuestions(teamId);
      setQuestions(data.questions);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Could not load the selected team questions.',
      );
    } finally {
      setLoadingQuestions(false);
    }
  }

  function updateFormField(field: keyof ApplicationFormData, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function validateRequiredAnswers(): string | null {
    const missingQuestion = questions.find((question) => {
      if (!question.isRequired) return false;
      const value = answers[question.id];
      return Array.isArray(value) ? value.length === 0 : !value?.trim();
    });

    return missingQuestion
      ? `Please answer: ${missingQuestion.questionText}`
      : null;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    const answerError = validateRequiredAnswers();
    if (answerError) {
      setError(answerError);
      return;
    }

    try {
      setSubmitting(true);
      const submissionResult = await submitApplication(form, answers);
      setResult(submissionResult);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (submitError) {
      setError(
        submitError instanceof ApiError || submitError instanceof Error
          ? submitError.message
          : 'Your application could not be submitted.',
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSubmitting(false);
    }
  }

  function resetApplication() {
    setForm(initialForm);
    setAnswers({});
    setQuestions([]);
    setResult(null);
    setError('');
  }

  return (
    <div className="subex-page" style={themeVariables}>
      <div className="subex-ambient subex-ambient-one" />
      <div className="subex-ambient subex-ambient-two" />

      <div className="subex-container">
        <section className="subex-hero">
          <div className="subex-eyebrow">
            <span className="subex-live-dot" />
            {options?.activeCycle?.title || 'Sub-Executive Recruitment'}
          </div>
          <h1>
            Build, innovate and grow with <span>AUSTRC</span>
          </h1>
          <p>
            Complete your basic information, select your preferred team and answer
            the screening questions prepared for that team.
          </p>

          <div className="subex-hero-stats">
            <div><Users size={20} /><span>Team-based selection</span></div>
            <div><Database size={20} /><span>Secure database submission</span></div>
            <div><ShieldCheck size={20} /><span>Validated application</span></div>
          </div>
        </section>

        {result ? (
          <section className="subex-success-card">
            <div className="subex-success-icon"><CheckCircle2 size={48} /></div>
            <p className="subex-section-kicker">Application submitted</p>
            <h2>Thank you, {result.applicantName}!</h2>
            <p className="subex-success-message">
              Your application for <strong>{result.teamName}</strong> has been stored
              successfully.
            </p>

            <div className="subex-application-number">
              <span>Your application number</span>
              <strong>{result.applicationNumber}</strong>
              <small>Save this number for future status checking.</small>
            </div>

            <div className="subex-success-details">
              <div><span>Student ID</span><strong>{result.studentId}</strong></div>
              <div><span>Status</span><strong>{result.status.replace('_', ' ')}</strong></div>
              <div><span>Recruitment</span><strong>{result.recruitmentCycle}</strong></div>
              <div><span>Submitted</span><strong>{formatDate(result.submittedAt)}</strong></div>
            </div>

            <button className="subex-primary-button" type="button" onClick={resetApplication}>
              Submit another application
            </button>
          </section>
        ) : (
          <section className="subex-form-layout">
            <aside className="subex-info-panel">
              <div className="subex-info-card subex-sticky-card">
                <p className="subex-section-kicker">Before you begin</p>
                <h2>Application information</h2>
                <ul className="subex-check-list">
                  <li><ClipboardCheck size={18} /> Use accurate academic information.</li>
                  <li><ClipboardCheck size={18} /> Select only the team you genuinely prefer.</li>
                  <li><ClipboardCheck size={18} /> Answer team questions in your own words.</li>
                  <li><ClipboardCheck size={18} /> Check your emails and phone number carefully.</li>
                </ul>

                {options?.activeCycle ? (
                  <div className="subex-cycle-card">
                    <span>Active recruitment</span>
                    <strong>{options.activeCycle.title}</strong>
                    <small>Closes: {formatDate(options.activeCycle.endAt)}</small>
                  </div>
                ) : !loadingOptions ? (
                  <div className="subex-closed-card">
                    <AlertCircle size={18} />
                    Registration is currently closed.
                  </div>
                ) : null}
              </div>
            </aside>

            <form className="subex-registration-form" onSubmit={handleSubmit}>
              {error && (
                <div className="subex-error-banner" role="alert">
                  <AlertCircle size={20} />
                  <span>{error}</span>
                </div>
              )}

              <div className="subex-form-card">
                <div className="subex-section-heading">
                  <span>01</span>
                  <div>
                    <p className="subex-section-kicker">Basic information</p>
                    <h2>Personal and academic details</h2>
                  </div>
                </div>

                {loadingOptions ? (
                  <div className="subex-loading-state">
                    <LoaderCircle className="subex-spin" size={20} />
                    Loading registration options...
                  </div>
                ) : (
                  <div className="subex-form-grid">
                    <div className="subex-field-group subex-full-width">
                      <label htmlFor="subex-full-name">Name <span className="subex-required">*</span></label>
                      <input
                        id="subex-full-name"
                        type="text"
                        value={form.fullName}
                        onChange={(event) => updateFormField('fullName', event.target.value)}
                        required
                        minLength={2}
                        maxLength={150}
                        disabled={submitting}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="subex-field-group">
                      <label htmlFor="subex-department">Department <span className="subex-required">*</span></label>
                      <select
                        id="subex-department"
                        value={form.departmentId}
                        onChange={(event) => updateFormField('departmentId', event.target.value)}
                        required
                        disabled={submitting}
                      >
                        <option value="">Select department</option>
                        {options?.departments.map((department) => (
                          <option key={department.id} value={department.id}>{department.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="subex-field-group">
                      <label htmlFor="subex-student-id">Student ID <span className="subex-required">*</span></label>
                      <input
                        id="subex-student-id"
                        type="text"
                        value={form.studentId}
                        onChange={(event) => updateFormField('studentId', event.target.value)}
                        required
                        maxLength={50}
                        disabled={submitting}
                        placeholder="Example: 20230104001"
                      />
                    </div>

                    <div className="subex-field-group">
                      <label htmlFor="subex-semester">Semester <span className="subex-required">*</span></label>
                      <select
                        id="subex-semester"
                        value={form.semesterId}
                        onChange={(event) => updateFormField('semesterId', event.target.value)}
                        required
                        disabled={submitting}
                      >
                        <option value="">Select semester</option>
                        {options?.semesters.map((semester) => (
                          <option key={semester.id} value={semester.id}>{semester.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="subex-field-group">
                      <label htmlFor="subex-phone">Phone number <span className="subex-required">*</span></label>
                      <input
                        id="subex-phone"
                        type="tel"
                        value={form.phoneNumber}
                        onChange={(event) => updateFormField('phoneNumber', event.target.value)}
                        required
                        minLength={7}
                        maxLength={20}
                        disabled={submitting}
                        placeholder="+8801XXXXXXXXX"
                      />
                    </div>

                    <div className="subex-field-group">
                      <label htmlFor="subex-edu-email">Educational email <span className="subex-required">*</span></label>
                      <input
                        id="subex-edu-email"
                        type="email"
                        value={form.eduEmail}
                        onChange={(event) => updateFormField('eduEmail', event.target.value)}
                        required
                        maxLength={255}
                        disabled={submitting}
                        placeholder="your-id@aust.edu"
                      />
                    </div>

                    <div className="subex-field-group">
                      <label htmlFor="subex-personal-email">Personal email <span className="subex-required">*</span></label>
                      <input
                        id="subex-personal-email"
                        type="email"
                        value={form.personalEmail}
                        onChange={(event) => updateFormField('personalEmail', event.target.value)}
                        required
                        maxLength={255}
                        disabled={submitting}
                        placeholder="yourname@gmail.com"
                      />
                    </div>

                    <div className="subex-field-group subex-full-width">
                      <label htmlFor="subex-linkedin">
                        LinkedIn profile <span className="subex-optional">Optional</span>
                      </label>
                      <input
                        id="subex-linkedin"
                        type="url"
                        value={form.linkedinUrl}
                        onChange={(event) => updateFormField('linkedinUrl', event.target.value)}
                        maxLength={1000}
                        disabled={submitting}
                        placeholder="https://www.linkedin.com/in/your-profile"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="subex-form-card">
                <div className="subex-section-heading">
                  <span>02</span>
                  <div>
                    <p className="subex-section-kicker">Team preference</p>
                    <h2>Select your desired team</h2>
                  </div>
                </div>

                <div className="subex-field-group">
                  <label htmlFor="subex-team">Team <span className="subex-required">*</span></label>
                  <select
                    id="subex-team"
                    value={form.teamId}
                    onChange={(event) => void handleTeamChange(event.target.value)}
                    required
                    disabled={loadingOptions || submitting}
                  >
                    <option value="">Select a team</option>
                    {options?.teams.map((team) => (
                      <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                  </select>
                </div>

                {selectedTeam?.description && (
                  <div className="subex-team-description">
                    <Users size={20} />
                    <p><strong>{selectedTeam.name}</strong>{selectedTeam.description}</p>
                  </div>
                )}
              </div>

              <div className="subex-form-card">
                <div className="subex-section-heading">
                  <span>03</span>
                  <div>
                    <p className="subex-section-kicker">Screening</p>
                    <h2>Team-specific questions</h2>
                  </div>
                </div>

                {loadingQuestions ? (
                  <div className="subex-loading-state">
                    <LoaderCircle className="subex-spin" size={20} />
                    Loading screening questions...
                  </div>
                ) : !form.teamId ? (
                  <div className="subex-empty-state">Select a team to see its screening questions.</div>
                ) : questions.length === 0 ? (
                  <div className="subex-empty-state">No screening questions are configured for this team.</div>
                ) : (
                  <div className="subex-questions-list">
                    {questions.map((question) => (
                      <QuestionField
                        key={question.id}
                        question={question}
                        value={answers[question.id]}
                        onChange={(value) =>
                          setAnswers((current) => ({ ...current, [question.id]: value }))
                        }
                        disabled={submitting}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="subex-submit-card">
                <div>
                  <strong>Ready to submit?</strong>
                  <span>Your information will be stored securely in the AUSTRC registration database.</span>
                </div>
                <button
                  className="subex-primary-button"
                  type="submit"
                  disabled={
                    submitting ||
                    loadingOptions ||
                    loadingQuestions ||
                    !options?.activeCycle
                  }
                >
                  {submitting ? (
                    <><LoaderCircle className="subex-spin" size={19} />Submitting...</>
                  ) : (
                    <><Send size={19} />Submit application</>
                  )}
                </button>
              </div>
            </form>
          </section>
        )}
      </div>
    </div>
  );
}
