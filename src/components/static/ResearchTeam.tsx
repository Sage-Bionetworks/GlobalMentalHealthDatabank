import React, { useEffect } from 'react'
import { Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { ReactComponent as Butterflies } from '../../assets/researchTeam/butterflies.svg'
import { ReactComponent as Circle } from '../../assets/home/circle.svg'
import { useHistory } from 'react-router-dom'
import useBreakpoint from '../../helpers/hooks/useBreakpoint'

import EmilyBampton from '../../assets/researchTeam/youthAdvisors/Emily-Bampton.jpg'
import RefiloeSibisi from '../../assets/researchTeam/youthAdvisors/Refiloe-Sibisi.jpg'
import SwethaRanganathan from '../../assets/researchTeam/youthAdvisors/Swetha-Ranganathan.jpg'

import HimaniShah from '../../assets/researchTeam/indiaTeam/Himani-Shah.jpg'
import JasmineKalha from '../../assets/researchTeam/indiaTeam/Jasmine-Kalha.jpg'
import MeeraDamji from '../../assets/researchTeam/indiaTeam/Meera-Damji.jpg'
import Minal from '../../assets/researchTeam/indiaTeam/Minal.jpg'
import SoumitraPathare from '../../assets/researchTeam/indiaTeam/Soumitra-Pathare.jpg'
import SushmitaSumant from '../../assets/researchTeam/indiaTeam/Sushmita-Sumant.jpg'

import GillianFinchilescu from '../../assets/researchTeam/southAfricaTeam/Gillian-Finchilescu.jpg'
import MelvynFreeman from '../../assets/researchTeam/southAfricaTeam/Melvyn-Freeman.jpg'
import ZukiswaZingela from '../../assets/researchTeam/southAfricaTeam/Zukiswa-Zingela.jpg'

import AnneMarieBurn from '../../assets/researchTeam/ukTeam/Anne-Marie-Burn.jpg'
import BlossomFernandes from '../../assets/researchTeam/ukTeam/Blossom-Fernandes.jpg'
import EmmaCarey from '../../assets/researchTeam/ukTeam/Emma-Carey.jpg'
import Lakshmi from '../../assets/researchTeam/ukTeam/Lakshmi-N.jpg'
import MinaFazel from '../../assets/researchTeam/ukTeam/mina-fazel.jpg'
import TamsinFord from '../../assets/researchTeam/ukTeam/Tamsin-Ford.jpg'

import ChristopherKemp from '../../assets/researchTeam/usTeam/Christopher-Kemp.jpg'
import FeliciaMataGreve from '../../assets/researchTeam/usTeam/Felicia-Mata-Greve.jpg'
import IsabellGriffithFillipo from '../../assets/researchTeam/usTeam/Isabell-Griffith-Fillipo.jpg'
import JenniferVelloza from '../../assets/researchTeam/usTeam/Jennifer-Velloza.jpg'
import NicholeSams from '../../assets/researchTeam/usTeam/Nichole-Sams.jpg'
import PamelaCollins from '../../assets/researchTeam/usTeam/Pamela-Collins.jpg'
import PatArean from '../../assets/researchTeam/usTeam/Pat-Arean.jpg'
import TessaConcepcion from '../../assets/researchTeam/usTeam/Tessa-Concepcion.jpg'

import CarlyMarten from '../../assets/researchTeam/sageTeam/Carly-Marten.jpg'
import ChristineSuver from '../../assets/researchTeam/sageTeam/Christine-Suver.jpg'
import EmilyMoore from '../../assets/researchTeam/sageTeam/Emily-Moore.jpg'
import ErinMounts from '../../assets/researchTeam/sageTeam/Erin-Mounts.jpg'
import ErinScanlan from '../../assets/researchTeam/sageTeam/Erin-Scanlan.jpg'
import JayHodgson from '../../assets/researchTeam/sageTeam/Jay-Hodgson.jpg'
import LaraMangravite from '../../assets/researchTeam/sageTeam/Lara-Mangravite.jpg'
import LarssonOmberg from '../../assets/researchTeam/sageTeam/Larsson-Omberg.jpg'
import LisaPasquale from '../../assets/researchTeam/sageTeam/Lisa-Pasquale.jpg'
import LjuboBradic from '../../assets/researchTeam/sageTeam/Ljubo-Bradic.jpg'
import MegDoerr from '../../assets/researchTeam/sageTeam/Meg-Doerr.jpg'
import MikeKellen from '../../assets/researchTeam/sageTeam/Mike-Kellen.jpg'
import SollySieberts from '../../assets/researchTeam/sageTeam/Solly-Sieberts.jpg'
import SoniaCarlson from '../../assets/researchTeam/sageTeam/Sonia-Carlson.jpg'
import StockardSimon from '../../assets/researchTeam/sageTeam/Stockard-Simon.jpg'

function ResizableImageComponent({ ...rest }: any) {
  return <img {...rest} />
}

function ResearchTeam() {
  const { t } = useTranslation()
  const history = useHistory()

  const breakpoint = useBreakpoint()
  const isMobile = breakpoint < 768

  useEffect(() => {
    ;(document.activeElement as HTMLElement).blur()
  }, [breakpoint])

  return (
    <div className="research">
      <div className="research__hero">
        <Typography variant="h2">{t('research.title1')}</Typography>
        <Typography variant="body1" className="research__hero-title">
          {t('research.subtitle1')}
        </Typography>
        <Circle className="circle" />
      </div>
      <div className="research__join-the-study">
        <Butterflies className="butterflies" />
        <Typography variant="h4" className="research__make-a-difference mobile">
          {t('research.makeDifference')}
        </Typography>
        <Typography
          variant="h4"
          className="research__make-a-difference desktop"
        >
          {t('research.yourExperience')}
        </Typography>

        <button onClick={() => history.push('/eligibility')}>
          {t('research.join')}
        </button>
      </div>

      <div className="research__section">
        <Typography variant="h2" className="research__section-title">
          {t('research.youthAdvisor.title')}
        </Typography>

        <div className="research__youth-container">
          <div className="research__section-images-youth">
            <img
              className="research__photo-youth"
              src={EmilyBampton}
              alt="team-member"
            />
            <div className="research__youth-info">
              <Typography variant="h4">
                {t('research.youthAdvisor.name1')}
              </Typography>
              <Typography variant="body2">
                {t('research.youthAdvisor.job1')}
              </Typography>
              <Typography variant="body1">
                {t('research.youthAdvisor.description1')}
              </Typography>
            </div>
          </div>
          <div className="research__section-images-youth">
            <img
              className="research__photo-youth"
              src={RefiloeSibisi}
              alt="team-member"
            />
            <div className="research__youth-info">
              <Typography variant="h4">
                {t('research.youthAdvisor.name2')}
              </Typography>
              <Typography variant="body2">
                {t('research.youthAdvisor.job2')}
              </Typography>
              <Typography variant="body1">
                {t('research.youthAdvisor.description2')}
              </Typography>
            </div>
          </div>
          <div className="research__section-images-youth">
            <img
              className="research__photo-youth"
              src={SwethaRanganathan}
              alt="team-member"
            />
            <div className="research__youth-info">
              <Typography variant="h4">
                {t('research.youthAdvisor.name3')}
              </Typography>
              <Typography variant="body2">
                {t('research.youthAdvisor.job3')}
              </Typography>
              <Typography variant="body1">
                {t('research.youthAdvisor.description3')}
              </Typography>
            </div>
          </div>
        </div>
        <Typography variant="h2" className="research__section-title">
          {t('research.indiaTeam.title')}
        </Typography>
        <div className="research__section-images">
          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={HimaniShah}
              alt="team-member"
              tabindex="0"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.indiaTeam.himaniShah.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.indiaTeam.himaniShah.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.indiaTeam.himaniShah.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.indiaTeam.himaniShah.location')}
              </Typography>
            </div>
          </div>

          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={JasmineKalha}
              alt="team-member"
              tabindex="1"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.indiaTeam.jasmineKalha.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.indiaTeam.jasmineKalha.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.indiaTeam.jasmineKalha.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.indiaTeam.jasmineKalha.location')}
              </Typography>
            </div>
          </div>

          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={MeeraDamji}
              alt="team-member"
              tabindex="2"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.indiaTeam.meeraDamji.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.indiaTeam.meeraDamji.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.indiaTeam.meeraDamji.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.indiaTeam.meeraDamji.location')}
              </Typography>
            </div>
          </div>

          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={Minal}
              alt="team-member"
              tabindex="3"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.indiaTeam.minalKarani.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.indiaTeam.minalKarani.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.indiaTeam.minalKarani.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.indiaTeam.minalKarani.location')}
              </Typography>
            </div>
          </div>

          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={SoumitraPathare}
              alt="team-member"
              tabindex="4"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.indiaTeam.soumitraPathare.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.indiaTeam.soumitraPathare.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.indiaTeam.soumitraPathare.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.indiaTeam.soumitraPathare.location')}
              </Typography>
            </div>
          </div>

          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={SushmitaSumant}
              alt="team-member"
              tabindex="5"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.indiaTeam.sushmitaSumant.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.indiaTeam.sushmitaSumant.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.indiaTeam.sushmitaSumant.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.indiaTeam.sushmitaSumant.location')}
              </Typography>
            </div>
          </div>
        </div>
        <Typography variant="h2" className="research__section-title">
          {t('research.southAfricaTeam.title')}
        </Typography>
        <div className="research__section-images">
          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={GillianFinchilescu}
              alt="team-member"
              tabindex="6"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.southAfricaTeam.gillianFinchilescu.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.southAfricaTeam.gillianFinchilescu.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.southAfricaTeam.gillianFinchilescu.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.southAfricaTeam.gillianFinchilescu.location')}
              </Typography>
            </div>
          </div>

          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={MelvynFreeman}
              alt="team-member"
              tabindex="7"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.southAfricaTeam.melvynFreeman.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.southAfricaTeam.melvynFreeman.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.southAfricaTeam.melvynFreeman.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.southAfricaTeam.melvynFreeman.location')}
              </Typography>
            </div>
          </div>

          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={ZukiswaZingela}
              alt="team-member"
              tabindex="8"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.southAfricaTeam.zukiswaZingela.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.southAfricaTeam.zukiswaZingela.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.southAfricaTeam.zukiswaZingela.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.southAfricaTeam.zukiswaZingela.location')}
              </Typography>
            </div>
          </div>
        </div>

        <Typography variant="h2" className="research__section-title">
          {t('research.ukTeam.title')}
        </Typography>
        <div className="research__section-images">
          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={AnneMarieBurn}
              alt="team-member"
              tabindex="9"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.ukTeam.annMarieBurn.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.ukTeam.annMarieBurn.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.ukTeam.annMarieBurn.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.ukTeam.annMarieBurn.location')}
              </Typography>
            </div>
          </div>

          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={BlossomFernandes}
              alt="team-member"
              tabindex="10"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.ukTeam.blossomFernandes.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.ukTeam.blossomFernandes.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.ukTeam.blossomFernandes.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.ukTeam.blossomFernandes.location')}
              </Typography>
            </div>
          </div>

          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={EmmaCarey}
              alt="team-member"
              tabindex="11"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.ukTeam.emmaCarey.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.ukTeam.emmaCarey.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.ukTeam.emmaCarey.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.ukTeam.emmaCarey.location')}
              </Typography>
            </div>
          </div>

          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={Lakshmi}
              alt="team-member"
              tabindex="12"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.ukTeam.lakshmiNeelakantan.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.ukTeam.lakshmiNeelakantan.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.ukTeam.lakshmiNeelakantan.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.ukTeam.lakshmiNeelakantan.location')}
              </Typography>
            </div>
          </div>

          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={MinaFazel}
              alt="team-member"
              tabindex="13"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.ukTeam.minaFazel.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.ukTeam.minaFazel.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.ukTeam.minaFazel.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.ukTeam.minaFazel.location')}
              </Typography>
            </div>
          </div>

          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={TamsinFord}
              alt="team-member"
              tabindex="14"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.ukTeam.tamsinFord.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.ukTeam.tamsinFord.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.ukTeam.tamsinFord.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.ukTeam.tamsinFord.location')}
              </Typography>
            </div>
          </div>
        </div>
        <Typography variant="h2" className="research__section-title">
          {t('research.usTeam.title')}
        </Typography>
        <div className="research__section-images">
          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={ChristopherKemp}
              alt="team-member"
              tabindex="15"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.usTeam.christopherKemp.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.usTeam.christopherKemp.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.usTeam.christopherKemp.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.usTeam.christopherKemp.location')}
              </Typography>
            </div>
          </div>

          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={FeliciaMataGreve}
              alt="team-member"
              tabindex="16"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.usTeam.feliciaMataGreve.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.usTeam.feliciaMataGreve.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.usTeam.feliciaMataGreve.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.usTeam.feliciaMataGreve.location')}
              </Typography>
            </div>
          </div>

          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={IsabellGriffithFillipo}
              alt="team-member"
              tabindex="17"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.usTeam.isabellGriffith.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.usTeam.isabellGriffith.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.usTeam.isabellGriffith.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.usTeam.isabellGriffith.location')}
              </Typography>
            </div>
          </div>

          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={JenniferVelloza}
              alt="team-member"
              tabindex="18"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.usTeam.jenniferVelloza.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.usTeam.jenniferVelloza.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.usTeam.jenniferVelloza.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.usTeam.jenniferVelloza.location')}
              </Typography>
            </div>
          </div>

          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={NicholeSams}
              alt="team-member"
              tabindex="19"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.usTeam.nicholeSams.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.usTeam.nicholeSams.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.usTeam.nicholeSams.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.usTeam.nicholeSams.location')}
              </Typography>
            </div>
          </div>

          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={PamelaCollins}
              alt="team-member"
              tabindex="20"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.usTeam.pamelaCollins.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.usTeam.pamelaCollins.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.usTeam.pamelaCollins.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.usTeam.pamelaCollins.location')}
              </Typography>
            </div>
          </div>

          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={PatArean}
              alt="team-member"
              tabindex="21"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.usTeam.patArean.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.usTeam.patArean.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.usTeam.patArean.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.usTeam.patArean.location')}
              </Typography>
            </div>
          </div>

          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={TessaConcepcion}
              alt="team-member"
              tabindex="22"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.usTeam.tessaConcepcion.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.usTeam.tessaConcepcion.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.usTeam.tessaConcepcion.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.usTeam.tessaConcepcion.location')}
              </Typography>
            </div>
          </div>
        </div>
        <Typography variant="h2" className="research__section-title">
          {t('research.sageTeam.title')}
        </Typography>
        <div className="research__section-images">
          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={CarlyMarten}
              alt="team-member"
              tabindex="23"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.sageTeam.carlyMarten.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.carlyMarten.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.carlyMarten.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.carlyMarten.location')}
              </Typography>
            </div>
          </div>

          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={ChristineSuver}
              alt="team-member"
              tabindex="24"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.sageTeam.christineSuver.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.christineSuver.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.christineSuver.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.christineSuver.location')}
              </Typography>
            </div>
          </div>

          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={EmilyMoore}
              alt="team-member"
              tabindex="25"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.sageTeam.emilyMoore.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.emilyMoore.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.emilyMoore.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.emilyMoore.location')}
              </Typography>
            </div>
          </div>

          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={ErinMounts}
              alt="team-member"
              tabindex="26"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.sageTeam.erinMounts.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.erinMounts.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.erinMounts.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.erinMounts.location')}
              </Typography>
            </div>
          </div>

          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={ErinScanlan}
              alt="team-member"
              tabindex="27"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.sageTeam.erinScanlan.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.erinScanlan.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.erinScanlan.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.erinScanlan.location')}
              </Typography>
            </div>
          </div>

          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={JayHodgson}
              alt="team-member"
              tabindex="28"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.sageTeam.jayHodgson.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.jayHodgson.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.jayHodgson.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.jayHodgson.location')}
              </Typography>
            </div>
          </div>

          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={LaraMangravite}
              alt="team-member"
              tabindex="29"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.sageTeam.laraMangravite.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.laraMangravite.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.laraMangravite.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.laraMangravite.location')}
              </Typography>
            </div>
          </div>

          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={LarssonOmberg}
              alt="team-member"
              tabindex="30"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.sageTeam.larssonOmberg.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.larssonOmberg.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.larssonOmberg.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.larssonOmberg.location')}
              </Typography>
            </div>
          </div>

          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={LisaPasquale}
              alt="team-member"
              tabindex="31"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.sageTeam.lisaPasquale.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.lisaPasquale.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.lisaPasquale.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.lisaPasquale.location')}
              </Typography>
            </div>
          </div>

          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={LjuboBradic}
              alt="team-member"
              tabindex="32"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.sageTeam.ljuboBradic.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.ljuboBradic.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.ljuboBradic.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.ljuboBradic.location')}
              </Typography>
            </div>
          </div>

          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={MegDoerr}
              alt="team-member"
              tabindex="33"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.sageTeam.megDoerr.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.megDoerr.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.megDoerr.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.megDoerr.location')}
              </Typography>
            </div>
          </div>

          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={MikeKellen}
              alt="team-member"
              tabindex="34"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.sageTeam.mikeKellen.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.mikeKellen.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.mikeKellen.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.mikeKellen.location')}
              </Typography>
            </div>
          </div>

          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={SollySieberts}
              alt="team-member"
              tabindex="35"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.sageTeam.sollySieberts.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.sollySieberts.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.sollySieberts.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.sollySieberts.location')}
              </Typography>
            </div>
          </div>

          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={SoniaCarlson}
              alt="team-member"
              tabindex="36"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.sageTeam.soniaCarlson.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.soniaCarlson.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.soniaCarlson.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.soniaCarlson.location')}
              </Typography>
            </div>
          </div>

          <div className="research__photo-container">
            <ResizableImageComponent
              className="research__photo-team"
              src={StockardSimon}
              alt="team-member"
              tabindex="37"
              onFocus={(e: any) => {
                isMobile && e.target.classList.add('big')
              }}
              onBlur={(e: any) => {
                e.target.classList.remove('big')
              }}
            />
            <div className="research__member-info">
              <Typography
                variant="h4"
                className="research__member-info-content"
              >
                {t('research.sageTeam.stockardSimon.name')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.stockardSimon.role')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.stockardSimon.position')}
              </Typography>
              <Typography
                variant="body2"
                className="research__member-info-content"
              >
                {t('research.sageTeam.stockardSimon.location')}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResearchTeam