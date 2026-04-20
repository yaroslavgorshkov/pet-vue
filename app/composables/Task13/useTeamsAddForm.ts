import type { Response, Team } from '~~/shared/task13/types';
import { isCodeUnique, isEmpty } from '~~/shared/task13/utils';

const useTeamsAddForm = (refresh: () => void) => {
    const title = ref('');
    const code = ref('');
    const lead = ref('');
    const description = ref('');

    type FormValues = {
        title: string;
        code: string;
        lead: string;
        description: string;
    };
    watch(
        [title, code, lead, description],
        ([titleNew, codeNew, leadNew, descriptionNew]) => {
            const newFormValues: FormValues = {
                title: titleNew,
                code: codeNew,
                lead: leadNew,
                description: descriptionNew,
            };

            localStorage.setItem(
                'teamsAddFormValues',
                JSON.stringify(newFormValues)
            );
        }
    );

    onMounted(() => {
        const teamsAddFormValues = localStorage.getItem('teamsAddFormValues');
        if (teamsAddFormValues === null) {
            title.value = '';
            code.value = '';
            lead.value = '';
            description.value = '';
            return;
        }
        try {
            const teamsAddFormValuesParsed = JSON.parse(
                teamsAddFormValues
            ) as FormValues;
            title.value = teamsAddFormValuesParsed.title;
            code.value = teamsAddFormValuesParsed.code;
            lead.value = teamsAddFormValuesParsed.lead;
            description.value = teamsAddFormValuesParsed.description;
        } catch {
            title.value = '';
            code.value = '';
            lead.value = '';
            description.value = '';
        }
    });

    type FormValidationMessages = {
        title: string;
        code: string;
        lead: string;
        description: string;
    };
    const formValidationMessages = ref<FormValidationMessages>({
        code: '',
        description: '',
        lead: '',
        title: '',
    });

    type IsFormTouched = {
        title: boolean;
        code: boolean;
        lead: boolean;
        description: boolean;
    };
    const isFormTouched = ref<IsFormTouched>({
        code: false,
        description: false,
        lead: false,
        title: false,
    });

    const formResponse = ref<Response>({
        isSucceed: false,
        message: '',
    });

    const isFormValid = computed(() => {
        const isTitleValidationMessageEmpty =
            formValidationMessages.value.title === '';
        const isCodeValidationMessageEmpty =
            formValidationMessages.value.code === '';
        const isLeadValidationMessageEmpty =
            formValidationMessages.value.lead === '';
        const isDescriptionValidationMessageEmpty =
            formValidationMessages.value.description === '';

        return (
            isTitleValidationMessageEmpty &&
            isCodeValidationMessageEmpty &&
            isLeadValidationMessageEmpty &&
            isDescriptionValidationMessageEmpty &&
            isFormTouched.value.code &&
            isFormTouched.value.description &&
            isFormTouched.value.lead &&
            isFormTouched.value.title
        );
    });

    const validateTitle = () => {
        formValidationMessages.value.title = '';

        if (isEmpty(title.value)) {
            formValidationMessages.value.title = 'Title cannot be empty';
        }

        if (!isFormTouched.value.title) {
            isFormTouched.value.title = true;
        }
    };

    const { data: teams } = useFetch<Team[]>('/api/teams');

    const validateCode = () => {
        formValidationMessages.value.code = '';

        if (isEmpty(code.value)) {
            formValidationMessages.value.code = 'Code cannot be empty';
        } else if (teams.value === undefined) {
            formValidationMessages.value.code =
                'Cannot check code uniqueness due to data is not fetched yet';
        } else if (!isCodeUnique(code.value, teams.value)) {
            formValidationMessages.value.code = 'Code is not unique';
        }

        if (!isFormTouched.value.code) {
            isFormTouched.value.code = true;
        }
    };

    const validateLead = () => {
        formValidationMessages.value.lead = '';

        if (isEmpty(lead.value)) {
            formValidationMessages.value.lead = 'Lead cannot be empty';
        }

        if (!isFormTouched.value.lead) {
            isFormTouched.value.lead = true;
        }
    };

    const validateDescription = () => {
        formValidationMessages.value.description = '';

        if (isEmpty(description.value)) {
            formValidationMessages.value.description =
                'Description cannot be empty';
        }

        if (!isFormTouched.value.description) {
            isFormTouched.value.description = true;
        }
    };

    const refreshForm = () => {
        title.value = '';
        code.value = '';
        description.value = '';
        lead.value = '';

        formValidationMessages.value = {
            code: '',
            description: '',
            lead: '',
            title: '',
        };

        isFormTouched.value = {
            code: false,
            description: false,
            lead: false,
            title: false,
        };

        setTimeout(() => {
            formResponse.value = {
                isSucceed: false,
                message: '',
            };
        }, 10000);

        refresh();
    };

    const revalidateForm = () => {
        formValidationMessages.value.title = '';
        if (isEmpty(title.value)) {
            formValidationMessages.value.title = 'Title cannot be empty';
        }

        formValidationMessages.value.code = '';
        if (isEmpty(code.value)) {
            formValidationMessages.value.code = 'Code cannot be empty';
        } else if (teams.value === undefined) {
            formValidationMessages.value.code =
                'Cannot check code uniqueness due to data is not fetched yet';
        } else if (!isCodeUnique(code.value, teams.value)) {
            formValidationMessages.value.code = 'Code is not unique';
        }

        formValidationMessages.value.lead = '';
        if (isEmpty(lead.value)) {
            formValidationMessages.value.lead = 'Lead cannot be empty';
        }

        formValidationMessages.value.description = '';
        if (isEmpty(description.value)) {
            formValidationMessages.value.description =
                'Description cannot be empty';
        }

        const isTitleValidationMessageEmpty =
            formValidationMessages.value.title === '';
        const isCodeValidationMessageEmpty =
            formValidationMessages.value.code === '';
        const isLeadValidationMessageEmpty =
            formValidationMessages.value.lead === '';
        const isDescriptionValidationMessageEmpty =
            formValidationMessages.value.description === '';

        return (
            isTitleValidationMessageEmpty &&
            isCodeValidationMessageEmpty &&
            isLeadValidationMessageEmpty &&
            isDescriptionValidationMessageEmpty
        );
    };

    const addTeam = async () => {
        if (!revalidateForm()) return;

        try {
            const newTeam = await $fetch<Team>('/api/teams', {
                method: 'POST',
                body: {
                    title: title.value,
                    code: code.value,
                    lead: lead.value,
                    description: description.value,
                },
            });

            formResponse.value = {
                isSucceed: true,
                message: `Successfully added new team with ID ${newTeam.id}`,
            };

            refreshForm();
        } catch (err: any) {
            formResponse.value = {
                isSucceed: false,
                message:
                    err.statusMessage || 'Server error during adding new team',
            };
        }
    };

    return {
        title,
        code,
        lead,
        description,
        isFormValid,
        formValidationMessages,
        formResponse,
        validateTitle,
        validateCode,
        validateLead,
        validateDescription,
        addTeam,
    };
};

export default useTeamsAddForm;
