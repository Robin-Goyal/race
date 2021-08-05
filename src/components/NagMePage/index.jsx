/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import NagmeTopSection from '@components/NagMePage/components/NagmeTopSection'
import NagmeEditNote from '@components/NagMePage/components/NagmeEditNote'
import NagmeEditAutoDelete from '@components/NagMePage/components/NagmeEditAutoDelete'
import SaveIcon from '@material-ui/icons/Save'
import { Pagination } from '@material-ui/lab'
import SEO from '@components/SEO'
import DeleteIcon from '@material-ui/icons/Delete'
import {
  makeStyles,
  useTheme,
  Backdrop,
  CircularProgress
} from '@material-ui/core'
import NagmeCreateModal from '@components/shared/NagMe/components/NagmeCreateModal'
import { toast } from 'react-toastify'
import {
  fetchData,
  updateNagmeSuccess,
  updateNagme
} from '@components/NagMePage/ducks/actions'
import { MODALS_LIST } from '@constants/common'
import { useDispatch, useSelector } from 'react-redux'
import { toggleModal } from '@store/ui/actions'
import CustomTable from '@components/shared/CustomTable'
import TableLink from '@components/shared/CustomTable/components/TableLink'
import dateConversations from '@utils/timeUtils'
import { kebabCase, cloneDeepWith } from 'lodash'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import {
  TIME_DEFAULT_FORMAT,
  DATE_DAY_YEAR_FORMAT
} from '@constants/dateFormatsList'
import NagmeDeleteModal from '@components/shared/NagMe/components/NagmeDeleteModal'
import { setItemData, resetItemData } from '@store/nagmeGlobalStore/actions'
import './index.scss'

const styles = makeStyles((theme) => ({
  'nagme-link': {
    textAlign: 'center',
    '& a': {
      display: 'inline-block',
      padding: '5px 0'
    }
  },
  'nagme-edit-note': {
    textAlign: 'center'
  },
  'nagme-edit-autodelete': {
    textAlign: 'center',
    margin: '5px 0'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}))

const NagMePage = () => {
  /* Styles hooks  */
  const classes = styles()
  const theme = useTheme()
  const [pageCurrent, setPage] = useState(1)
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [isLoadingNagme, setLoadingNagme] = useState(false)
  /* Styles hooks ends  */

  const [currentSelectedNagme, setCurrentSelectedNagme] = useState(null)
  const [currentModalType, setCurrentModalType] = useState(null)

  const dispatch = useDispatch()
  const nagmePageStore = useSelector((store) => store.nagmePage)
  const modalStorage = useSelector((store) => store.ui)

  const isAddModalOpen = useMemo(
    () => modalStorage.openModals.includes(MODALS_LIST.NAGME_CREATING_MODAL),
    [modalStorage.openModals]
  )

  const isDeleteModalOpen = () =>
    modalStorage.openModals.includes(MODALS_LIST.NAGME_DELETE_MODAL)

  /* Fetch only on initial render */
  useEffect(() => {
    dispatch(
      fetchData({
        page: 1
      })
    )
    return () => {}
  }, [])

  useEffect(() => {}, [currentSelectedNagme, currentModalType])

  const handleNagmeAddModal = useCallback(
    (nagme = {}) => {
      dispatch(setItemData(nagme))
      setCurrentModalType(MODALS_LIST.NAGME_CREATING_MODAL)
      dispatch(toggleModal(MODALS_LIST.NAGME_CREATING_MODAL))
    },
    [currentModalType]
  )

  const handleUpdateNagme = useCallback((nagme = {}) => {
    setLoadingNagme(true)
    dispatch(
      updateNagme({
        data: {
          id: nagme.id,
          'auto-delete': nagme.auto_delete,
          note: nagme.note
        },
        onSuccess: () => {
          setLoadingNagme(false)
          toast.success('NagMe successfully updated')
        },
        onError: (e) => {
          setLoadingNagme(false)
          const message = e.message || e
          toast.error(message)
        }
      })
    )
  }, [])

  const handleCloseModals = (type) => {
    dispatch(resetItemData())
    setCurrentModalType(type)
    dispatch(toggleModal(type))
  }

  const handleDeleteNagmeModal = (id, name) => {
    setCurrentSelectedNagme({
      id,
      name
    })
    setCurrentModalType(MODALS_LIST.NAGME_DELETE_MODAL)
    dispatch(toggleModal(MODALS_LIST.NAGME_DELETE_MODAL))
  }

  const handleEditNote = (value, rowData) => {
    const nagme = { ...rowData }
    nagme.note = value
    dispatch(updateNagmeSuccess({ nagme }))
  }

  const handleEditAutoDelete = (value, rowData) => {
    const nagme = { ...rowData }
    nagme.auto_delete = value
    dispatch(updateNagmeSuccess({ nagme }))
  }

  const handleChangePage = (e, page) => {
    setPage(page)
    dispatch(
      fetchData({
        page: page
      })
    )
  }

  const getRaceLinkCourse = (url) => {
    if (url.endsWith('/')) {
      const slicedURL = url.slice(0, -1)
      return slicedURL
        .substring(0, slicedURL.lastIndexOf('/') + 1)
        .replace('/api', '')
    }
    return url.substring(0, url.lastIndexOf('/') + 1).replace('/api', '')
  }

  return (
    <>
      <div className="row">
        <SEO title="My NagMes" />
        <div className="col-xs-12">
          <div className="nagme-top-section">
            <div className="nagme-top-section-left">
              <NagmeTopSection
                nagmeCount={nagmePageStore.numNagMes}
                nagmeTotalCount={nagmePageStore.nagsMaxNum}
                handleOpenModal={handleNagmeAddModal}
                handleCloseModal={handleCloseModals}
              />
            </div>
            <div className="nagme-top-section-right">
              {nagmePageStore.totalPages > 1 && (
                <div className="pagination-wrap">
                  <Pagination
                    count={nagmePageStore.totalPages}
                    page={pageCurrent}
                    onChange={handleChangePage}
                    color="primary"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12" style={{ paddingTop: 0 }}>
          <div className="nagme-table">
            <CustomTable
              //eslint-disable react/prop-types
              columns={[
                {
                  title: 'Horse Name',
                  field: 'horse[name]',
                  emptyValue: '-',
                  cellStyle: {
                    textAlign: 'center',
                    padding: 0
                  },
                  render: ({ horse }) => (
                    <TableLink
                      pathname={
                        horse.nationality
                          ? `/history/horse/${kebabCase(
                              horse.nationality
                            )}/${horse.name.replace(/ /g, '').toLowerCase()}`
                          : `/history/horse/${horse.name
                              .replace(/ /g, '')
                              .toLowerCase()}`
                      }
                      routeState={{ data: horse, type: 'Horse' }}
                      label={horse.name}
                    />
                  )
                },
                {
                  title: 'Date Created',
                  field: 'created_at',
                  render: ({ created_at }) =>
                    dateConversations.getFormattedDate(
                      created_at,
                      DATE_DAY_YEAR_FORMAT
                    )
                },
                {
                  title: 'Race When NagMe Added',
                  field: 'race',
                  emptyValue: '-',
                  cellStyle: {
                    textAlign: 'center'
                  },
                  render: ({ race }) => (
                    <div className={classes['nagme-link']}>
                      <TableLink
                        pathname={race.url.replace('/api', '')}
                        label={dateConversations.getFormattedDate(
                          race.start_time,
                          TIME_DEFAULT_FORMAT
                        )}
                      />{' '}
                      @{' '}
                      <TableLink
                        pathname={getRaceLinkCourse(race.url)}
                        label={race.course}
                      />
                      <br />
                      <TableLink
                        pathname={`/races/${dateConversations.getFormattedDate(
                          race.start_time
                        )}/`}
                        label={dateConversations.getFormattedDate(
                          race.start_time,
                          DATE_DAY_YEAR_FORMAT
                        )}
                      />
                    </div>
                  )
                },
                {
                  title: 'Runs Since NagMe Added',
                  emptyValue: '-',
                  width: 150,
                  field: 'number_of_runs_since_nagged'
                },
                {
                  title: 'Notes',
                  field: 'note',
                  emptyValue: '-',
                  cellStyle: {
                    minWidth: 350,
                    textAlign: 'center'
                  },
                  render: (rowData) => (
                    <div className={classes['nagme-edit-note']}>
                      <NagmeEditNote
                        rowData={rowData}
                        handleEditNote={handleEditNote}
                        noteMaxLength={nagmePageStore.noteMaxLength}
                      />
                    </div>
                  )
                },
                {
                  title: 'AutoDelete',
                  field: 'auto_delete',
                  cellStyle: {
                    minWidth: 130,
                    textAlign: 'center',
                    verticalAlign: 'top'
                  },
                  render: (rowData) => (
                    <div className={classes['nagme-edit-autodelete']}>
                      <NagmeEditAutoDelete
                        rowData={rowData}
                        handleEditAutoDelete={handleEditAutoDelete}
                      />
                    </div>
                  )
                }
              ]}
              data={cloneDeepWith(nagmePageStore.data)}
              actions={[
                {
                  icon: () => <SaveIcon />,
                  tooltip: 'Save NagMe',
                  onClick: (event, rowData) => handleUpdateNagme(rowData)
                },
                {
                  icon: () => <DeleteIcon />,
                  tooltip: 'Delete NagMe',
                  onClick: (event, rowData) =>
                    handleDeleteNagmeModal(rowData.id, rowData.horse.name)
                }
              ]}
              options={{
                actionsColumnIndex: -1,
                pageSizeOptions: [],
                emptyRowsWhenPaging: false,
                tableLayout: 'auto',
                cellStyle: {
                  textAlign: 'center'
                },
                paging: false
              }}
              isLoading={nagmePageStore.loading}
            />
          </div>
          <NagmeCreateModal
            isOpen={isAddModalOpen}
            onClose={() => handleCloseModals(MODALS_LIST.NAGME_CREATING_MODAL)}
            handleClose={() =>
              handleCloseModals(MODALS_LIST.NAGME_CREATING_MODAL)
            }
            nagme={currentSelectedNagme}
            noteMaxLength={nagmePageStore.noteMaxLength}
          />
          <NagmeDeleteModal
            isOpen={isDeleteModalOpen()}
            handleClose={() =>
              handleCloseModals(MODALS_LIST.NAGME_DELETE_MODAL)
            }
            nagme={currentSelectedNagme}
            fullScreen={fullScreen}
            noteMaxLength={nagmePageStore.noteMaxLength}
          />
        </div>
      </div>
      <Backdrop className={classes['backdrop']} open={isLoadingNagme}>
        <CircularProgress color="primary" disableShrink />
      </Backdrop>
    </>
  )
}

export default NagMePage
