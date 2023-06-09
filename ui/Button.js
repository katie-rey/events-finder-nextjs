import classes from './Button.module.css'
import Link from 'next/link'

function Button(props) {
  if (props.link) {
    return (
      <>
        <Link href={props.link} className={classes.btn}>
          {props.children}
        </Link>
        {/* in next 13 we dont need to add an <a> </a> element */}
      </>
    )
  } else {
    return (
      <button className={classes.btn} onClick={props.onClick}>
        {props.children}
      </button>
    )
  }
}

export default Button
