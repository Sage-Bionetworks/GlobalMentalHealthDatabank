import React from 'react'
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Toolbar } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'

type FooterProps = {
  token: string | undefined
}

const useStyles = makeStyles(theme => ({
  toolBar: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '35px 0px 15px 0px',
      width: '30%',
    },
  },
}))

export const Footer: React.FunctionComponent<FooterProps> = props => {
  const classes = useStyles()
  return (
    <div>
      <div className="footer">
        <CssBaseline />
        <div className="footer__container">
          <Toolbar className={classes.toolBar}>
            <NavLink to="/home" className="footer__navlink">
              Home
            </NavLink>
            <NavLink to="/home" className="footer__navlink">
              About
            </NavLink>
            <NavLink to="/home" className="footer__navlink">
              Research Team
            </NavLink>
            <NavLink to="/home" className="footer__navlink">
              Contact
            </NavLink>
          </Toolbar>
          <div className="footer__right-section">
            <div>
              The MindKind Study is a research study and does not provide
              medical advice, diagnosis or treatment.
            </div>
            <div>Copyright Mindkind 2021</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
