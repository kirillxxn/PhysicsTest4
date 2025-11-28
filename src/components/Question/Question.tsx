import React from 'react'
import styles from './Question.module.css'

type QuestionProps = {
	question: {
		number: number
		text: string
		imageUrl?: string
		options: Array<{ label: string; value: number }>
		answerLabels?: string[]
	}
	answer: number[]
	onAnswerChange: (answer: number[]) => void
}

const Question: React.FC<QuestionProps> = ({
	question,
	answer,
	onAnswerChange,
}) => {
	const handleAnswerChange = (index: number, value: number) => {
		const newAnswer = [...answer]
		newAnswer[index] = value
		onAnswerChange(newAnswer)
	}

	const renderAnswerSection = () => {
		const labels = question.answerLabels || ['А', 'Б', 'В', 'Г']

		return (
			<div className={styles.answerSection}>
				{labels.map((label, index) => (
					<div key={index} className={styles.answerColumn}>
						<h4 className={styles.quantityTitle}>Пропуск {label}</h4>
						<div className={styles.options}>
							{question.options.map(option => (
								<label key={option.value} className={styles.option}>
									<input
										type='radio'
										name={`answer-${index}`}
										value={option.value}
										checked={answer[index] === option.value}
										onChange={() => handleAnswerChange(index, option.value)}
									/>
									<span>{option.label}</span>
								</label>
							))}
						</div>
					</div>
				))}
			</div>
		)
	}

	const getImageUrl = (url: string | undefined): string => {
		if (!url) return ''

		const base = import.meta.env.BASE_URL

		if (url.startsWith(base)) {
			return url
		}

		return `${base}${url}`
	}

	return (
		<div className={styles.question}>
			<h3 className={styles.questionNumber}>Вопрос {question.number}</h3>
			<div className={styles.questionText}>{question.text}</div>

			{question.imageUrl && (
				<div className={styles.imageContainer}>
					<img
						src={getImageUrl(question.imageUrl)}
						alt='Иллюстрация к вопросу'
						onError={e => {
							const target = e.target as HTMLImageElement
							target.style.display = 'none'
							const parent = target.parentElement
							if (parent) {
								parent.style.display = 'none'
							}
						}}
						loading='lazy'
					/>
				</div>
			)}

			{renderAnswerSection()}
		</div>
	)
}

export default Question
