import { formatTime, formatDate, getTimeRemaining } from '../utils/dates'
import '../css/Event.css'

const Event = ({ id, title, date, time, image }) => {
    const displayDate = formatDate(date)
    const displayTime = formatTime(time)
    const { text: remaining, isPast } = getTimeRemaining(date, time)

    return (
        <article className={`event-information${isPast ? ' event-past' : ''}`}>
            <img src={image} alt={title} />

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{title}</h3>
                    <p>
                        <i className="fa-regular fa-calendar fa-bounce"></i> {displayDate}
                        <br />{displayTime}
                    </p>
                    <p id={`remaining-${id}`} className={isPast ? 'negative-time-remaining' : 'time-remaining'}>
                        {isPast
                            ? <><i className="fa-solid fa-clock-rotate-left"></i> {remaining}</>
                            : <><i className="fa-regular fa-hourglass-half"></i> {remaining}</>
                        }
                    </p>
                </div>
            </div>
        </article>
    )
}

export default Event
