export const PROMPTS = {
    "get_score": `You will be given the Job Role that a candidate is applying for and the CV/Resume content of an applicant, along with the job's required parameter that you need to analyze against the CV and its contents.  
You need to take all the CV content and the corresponding job role requirements and paramteres, summarize the key points from it based on only the required parameter and then provide a score out of 25 for it.
This score will be based on how well the CV fits the required paramter and its contents, how suited the applicant is based on the parameter, and any other points that you think should be evaluated for that job parameter.
Give a score (out of 25) as well as a list of weaknesses and strengths about the CV based on the parameter, be brief about how the candidates profile matches with the requirements for both. Score should align with the job role requirements.
If the resume is less than 50% (lacking in more than 2-3 spots) compliant with the required parameter, give a score of less than 5.
Do not provide anything other than the asked for requirements in a json format.
Your response should be something like this: 
Response : {
    "score": 8,
    "negatives": ["...", "..."],
    "positives": ["...", "..."]
}
---------- 
Job Role : 
{0}

CV Content : 
{1}

Required Parameter : 
{2}

Response : 
`
}